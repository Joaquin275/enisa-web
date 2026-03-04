import { prisma } from "@/lib/prisma";
import { generateSlots, timeToMinutes } from "@/lib/utils";

interface TimeWindow {
  start: string;
  end: string;
}

export async function getAvailableSlots(date: Date) {
  const weekday = date.getDay();

  const config = await prisma.slotConfig.findFirst();
  const slotDuration = config?.slotDurationMinutes ?? 120;
  const windows = (config?.dailyTimeWindows as unknown as TimeWindow[]) ?? [
    { start: "09:00", end: "13:00" },
    { start: "16:00", end: "20:00" },
  ];

  const allSlots: Array<{ start: string; end: string }> = [];
  for (const w of windows) {
    allSlots.push(...generateSlots(w.start, w.end, slotDuration));
  }

  const allStaff = await prisma.staff.findMany({
    where: { active: true },
    include: {
      availabilityRules: { where: { weekday } },
      availabilityExceptions: {
        where: { date: { equals: date } },
      },
      bookings: {
        where: {
          date: { equals: date },
          status: { in: ["PENDIENTE", "CONFIRMADA"] },
        },
      },
    },
  });

  const result: Array<{
    slot: { start: string; end: string };
    availableStaff: Array<{ id: string; name: string; bio?: string | null }>;
  }> = [];

  for (const slot of allSlots) {
    const slotStartMins = timeToMinutes(slot.start);
    const slotEndMins = timeToMinutes(slot.end);

    const availableStaff = allStaff.filter((staff) => {
      const hasRule = staff.availabilityRules.some(
        (r) =>
          timeToMinutes(r.startTime) <= slotStartMins &&
          timeToMinutes(r.endTime) >= slotEndMins
      );
      if (!hasRule) return false;

      const isBlocked = staff.availabilityExceptions.some((ex) => {
        if (!ex.startTime || !ex.endTime) return true;
        return (
          timeToMinutes(ex.startTime) < slotEndMins &&
          timeToMinutes(ex.endTime) > slotStartMins
        );
      });
      if (isBlocked) return false;

      const hasBooking = staff.bookings.some((b) => {
        const bStart = new Date(b.startAt);
        const bEnd = new Date(b.endAt);
        const bStartMins = bStart.getHours() * 60 + bStart.getMinutes();
        const bEndMins = bEnd.getHours() * 60 + bEnd.getMinutes();
        return bStartMins < slotEndMins && bEndMins > slotStartMins;
      });
      if (hasBooking) return false;

      return true;
    });

    if (availableStaff.length > 0) {
      result.push({
        slot,
        availableStaff: availableStaff.map((s) => ({
          id: s.id,
          name: s.name,
          bio: s.bio,
        })),
      });
    }
  }

  return result;
}
