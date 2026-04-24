"use client";

import { ChannelStrip } from "./ChannelStrip";
import { CardContent } from "@/components/ui/card";

export function VirtualInputs() {
  const routingOptions1 = [
    { label: "A1", param: `Strip[3].A1` },
    { label: "A2", param: `Strip[3].A2` },
    { label: "A3", param: `Strip[3].A3` },
    { label: "B1", param: `Strip[3].B1` },
    { label: "B2", param: `Strip[3].B2` },
  ];

  const routingOptions2 = [
    { label: "A1", param: `Strip[4].A1` },
    { label: "A2", param: `Strip[4].A2` },
    { label: "A3", param: `Strip[4].A3` },
    { label: "B1", param: `Strip[4].B1` },
    { label: "B2", param: `Strip[4].B2` },
  ];

  return (
    <CardContent className="p-0 flex gap-2 h-full">
      <ChannelStrip
        label="Voicemeeter VAIO"
        className="flex-1 min-h-0 min-w-0"
        gainParam="Strip[3].Gain"
        muteParam="Strip[3].Mute"
        routingOptions={routingOptions1}
      />
      <ChannelStrip
        label="Voicemeeter AUX"
        className="flex-1 min-h-0 min-w-0"
        gainParam="Strip[4].Gain"
        muteParam="Strip[4].Mute"
        routingOptions={routingOptions2}
      />
    </CardContent>
  );
}
