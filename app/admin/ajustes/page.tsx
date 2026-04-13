export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/SettingsForm";

const MOCK_SETTINGS = {
  id: "demo",
  companyName: "Enisa Limpieza · Servicios para el Hogar",
  companyPhone: "+34 691 74 67 30",
  companyEmail: "info@enisalimpieza.es",
  companyAddress: "C. Vicente Aleixandre, 28, 15009 A Coruña, Galicia",
};

const MOCK_SLOT_CONFIG = {
  id: "demo",
  slotDurationMinutes: 120,
};

export default async function AjustesPage() {
  let settings: typeof MOCK_SETTINGS | null = MOCK_SETTINGS;
  let slotConfig: typeof MOCK_SLOT_CONFIG | null = MOCK_SLOT_CONFIG;
  let isDemo = false;

  try {
    const [dbSettings, dbSlot] = await Promise.all([
      prisma.siteSettings.findFirst(),
      prisma.slotConfig.findFirst(),
    ]);
    if (dbSettings) {
      settings = {
        id: dbSettings.id,
        companyName: dbSettings.companyName,
        companyPhone: dbSettings.companyPhone,
        companyEmail: dbSettings.companyEmail,
        companyAddress: dbSettings.companyAddress,
      };
    } else {
      isDemo = true;
    }
    if (dbSlot) {
      slotConfig = {
        id: dbSlot.id,
        slotDurationMinutes: (dbSlot as unknown as { slotDurationMinutes: number }).slotDurationMinutes ?? 120,
      };
    }
  } catch {
    isDemo = true;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy-950">Ajustes</h1>
        {isDemo && (
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 font-medium">
            Datos de ejemplo · Modo demo
          </span>
        )}
      </div>
      {isDemo && (
        <div className="bg-amber-50 border border-amber-200 px-4 py-3 mb-6 text-xs text-amber-800">
          Mostrando ajustes de ejemplo. Conecta la base de datos para guardar cambios de forma persistente.
        </div>
      )}
      <SettingsForm settings={settings} slotConfig={slotConfig} />
    </div>
  );
}

