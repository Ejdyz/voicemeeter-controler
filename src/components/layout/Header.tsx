"use client";

import { useVoicemeeterStore } from "@/hooks/use-voicemeeter";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ActionButtons } from "./ActionButtons";

export function Header() {
  const { isConnected } = useVoicemeeterStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex-none shrink-0 flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight">VoiceMeeter</h1>
        <div className={cn("size-2.5 rounded-full shadow-sm mt-1", isConnected ? "bg-green-500 shadow-green-500/50" : "bg-red-500 shadow-red-500/50")} />
      </div>
      
      <ActionButtons className="hidden md:flex" />
    </header>
  );
}
