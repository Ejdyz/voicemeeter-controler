"use client";

import { useState } from "react";
import { ChannelStrip } from "./ChannelStrip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HARDWARE_INPUTS = [
  { id: 0, name: "Hardware Input 1" },
  { id: 1, name: "Hardware Input 2" },
  { id: 2, name: "Hardware Input 3" },
];

export function HardwareInputs() {
  const [selectedIndex, setSelectedIndex] = useState("0");

  const i = parseInt(selectedIndex, 10);

  const routingOptions = [
    { label: "A1", param: `Strip[${i}].A1` },
    { label: "A2", param: `Strip[${i}].A2` },
    { label: "A3", param: `Strip[${i}].A3` },
    { label: "B1", param: `Strip[${i}].B1` },
    { label: "B2", param: `Strip[${i}].B2` },
  ];

  return (
    <ChannelStrip
      label="Hardware"
      className="flex-1 min-h-0 h-full"
      gainParam={`Strip[${i}].Gain`}
      muteParam={`Strip[${i}].Mute`}
      routingOptions={routingOptions}
      renderHeader={
        <Select value={selectedIndex} onValueChange={(value) => setSelectedIndex(value || "")}>
          <SelectTrigger className="w-full text-xs h-8">
            <SelectValue placeholder="Select Input">
              {HARDWARE_INPUTS.find((hw) => hw.id.toString() === selectedIndex)?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {HARDWARE_INPUTS.map((hw) => (
              <SelectItem key={hw.id} value={hw.id.toString()}>{hw.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    />
  );
}
