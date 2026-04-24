"use client";

import { Header } from "@/components/layout/Header";
import { ActionButtons } from "@/components/layout/ActionButtons";
import { HardwareInputs } from "@/components/voicemeeter/HardwareInputs";
import { Outputs } from "@/components/voicemeeter/Outputs";
import { SettingsModal } from "@/components/voicemeeter/SettingsModal";
import { VirtualInputs } from "@/components/voicemeeter/VirtualInputs";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 h-full overflow-hidden bg-background">
      <Header />
      
      {/* Main interface */}
      <div className="flex-1 flex flex-col md:flex-row p-4 max-w-dvw gap-4 overflow-y-auto md:overflow-x-auto md:overflow-y-hidden min-h-0">
        {/* HW Inputs Section */}
        <section className="flex flex-col flex-[1_1_25%] min-w-40 min-h-0 border bg-card rounded-2xl text-card-foreground shadow-sm">
          <div className="p-3 border-b font-semibold text-sm">
            Hardware Inputs
          </div>
          <div className="flex-1 min-h-0 p-2">
            <HardwareInputs />
          </div>
        </section>

        {/* Virtual Inputs Section */}
        <section className="flex flex-col flex-[2_1_25%] min-h-0 md:min-w-[300px] border bg-card rounded-2xl text-card-foreground shadow-sm">
          <div className="p-3 border-b font-semibold text-sm">
            Virtual Inputs
          </div>
          <div className="flex-1 min-h-0 p-2">
            <VirtualInputs />
          </div>
        </section>

        {/* Outputs Section */}
        <section className="flex flex-col flex-[3_1_40%] min-h-0 md:min-w-[450px] bg-card border rounded-2xl text-card-foreground shadow-sm">
          <div className="p-3 border-b font-semibold text-sm">
            Outputs
          </div>
          <div className="flex-1 min-h-0 p-2">
            <Outputs />
          </div>
        </section>

      </div>
      
      <SettingsModal />
    </main>
  );
}
