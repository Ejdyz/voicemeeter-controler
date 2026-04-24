"use client";

import { ChannelStrip } from "./ChannelStrip";
import { Card, CardContent } from "@/components/ui/card";

export function Outputs() {
  const outputs = [
    { id: 0, name: "A1" },
    { id: 1, name: "A2" },
    { id: 2, name: "A3" },
    { id: 3, name: "B1" },
    { id: 4, name: "B2" },
  ];

  return (
    <CardContent className="p-0 grid grid-cols-5 gap-1.5 h-full">
      {outputs.map((out) => (
        <ChannelStrip
          key={out.id}
          label={out.name}
          className="flex-1 min-w-0 px-1 py-3"
          gainParam={`Bus[${out.id}].Gain`}
          muteParam={`Bus[${out.id}].Mute`}
        />
      ))}
    </CardContent>
  );
}
