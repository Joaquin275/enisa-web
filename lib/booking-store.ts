import { create } from "zustand";

export interface BookingSlot {
  start: string;
  end: string;
}

export interface BookingStaff {
  id: string;
  name: string;
  bio?: string | null;
}

export interface BookingState {
  step: number;
  serviceId: string;
  serviceName: string;
  areaId: string;
  areaName: string;
  date: string;
  slot: BookingSlot | null;
  staffId: string;
  staffName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  notes: string;
  setStep: (step: number) => void;
  setService: (id: string, name: string) => void;
  setArea: (id: string, name: string) => void;
  setDate: (date: string) => void;
  setSlot: (slot: BookingSlot) => void;
  setStaff: (id: string, name: string) => void;
  setCustomer: (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
  }) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  serviceId: "",
  serviceName: "",
  areaId: "",
  areaName: "",
  date: "",
  slot: null,
  staffId: "",
  staffName: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  address: "",
  notes: "",
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setService: (id, name) => set({ serviceId: id, serviceName: name }),
  setArea: (id, name) => set({ areaId: id, areaName: name }),
  setDate: (date) => set({ date, slot: null, staffId: "", staffName: "" }),
  setSlot: (slot) => set({ slot, staffId: "", staffName: "" }),
  setStaff: (id, name) => set({ staffId: id, staffName: name }),
  setCustomer: (data) =>
    set({
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      address: data.address,
      notes: data.notes,
    }),
  reset: () => set(initialState),
}));
