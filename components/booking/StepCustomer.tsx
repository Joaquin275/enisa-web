"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBookingStore } from "@/lib/booking-store";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const schema = z.object({
  name: z.string().min(2, "Introduce tu nombre completo"),
  email: z.string().email("Email no válido"),
  phone: z.string().min(9, "Teléfono no válido"),
  address: z.string().min(5, "Introduce la dirección completa"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function StepCustomer({ services, areas }: { services?: unknown[]; areas?: unknown[] }) {
  const { customerName, customerEmail, customerPhone, address, notes, setCustomer, setStep } =
    useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address,
      notes,
    },
  });

  function onSubmit(data: FormData) {
    setCustomer({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      notes: data.notes ?? "",
    });
    setStep(6);
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">Tus datos de contacto</h2>
        <p className="text-gray-500 text-sm">
          Necesitamos tus datos para confirmar la reserva y ponernos en contacto contigo.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Nombre completo"
          id="name"
          placeholder="María García"
          error={errors.name?.message}
          {...register("name")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Teléfono"
            id="phone"
            type="tel"
            placeholder="+34 XXX XXX XXX"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <Input
          label="Dirección del servicio"
          id="address"
          placeholder="Calle, número, piso, municipio"
          error={errors.address?.message}
          {...register("address")}
        />
        <Textarea
          label="Notas adicionales (opcional)"
          id="notes"
          placeholder="Acceso especial, número de habitaciones, instrucciones particulares..."
          rows={4}
          {...register("notes")}
        />

        <div className="flex gap-4 mt-2">
          <Button type="button" variant="outline" onClick={() => setStep(4)}>
            Atrás
          </Button>
          <Button type="submit">Ver resumen</Button>
        </div>
      </form>
    </div>
  );
}
