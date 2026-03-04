"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "@/lib/booking-store";
import { StepService } from "./StepService";
import { StepArea } from "./StepArea";
import { StepDate } from "./StepDate";
import { StepSlot } from "./StepSlot";
import { StepCustomer } from "./StepCustomer";
import { StepConfirmation } from "./StepConfirmation";

const STEPS = [
  { number: 1, label: "Servicio" },
  { number: 2, label: "Zona" },
  { number: 3, label: "Fecha" },
  { number: 4, label: "Horario" },
  { number: 5, label: "Tus datos" },
  { number: 6, label: "Confirmación" },
];

const stepComponents = [StepService, StepArea, StepDate, StepSlot, StepCustomer, StepConfirmation];

export function BookingWizard({
  services,
  areas,
}: {
  services: { id: string; name: string; shortDescription: string }[];
  areas: { id: string; name: string }[];
}) {
  const step = useBookingStore((s) => s.step);
  const StepComponent = stepComponents[step - 1];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-12">
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step > s.number
                      ? "bg-navy-900 text-white"
                      : step === s.number
                      ? "bg-navy-900 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s.number ? "✓" : s.number}
                </div>
                <span
                  className={`text-[10px] mt-1.5 tracking-wide font-medium whitespace-nowrap ${
                    step >= s.number ? "text-navy-900" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 mb-4 transition-all duration-300 ${
                    step > s.number ? "bg-navy-900" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StepComponent services={services} areas={areas} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
