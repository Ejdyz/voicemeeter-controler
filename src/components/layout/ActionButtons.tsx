"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from '@hugeicons/react'; 
import { MoonIcon, SunIcon, Settings02Icon, Maximize01Icon, Refresh01Icon } from "@hugeicons/core-free-icons";
import { useVoicemeeterStore } from "@/hooks/use-voicemeeter";
import { cn } from "@/lib/utils";

export function ActionButtons({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const { socket } = useVoicemeeterStore();

  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const restartEngine = () => {
     if (socket) {
       socket.emit("setParameter", { parameter: "Command.Restart", value: 1 });
     }
  };

  const openSettings = () => {
    window.dispatchEvent(new Event("open-settings"));
  };

  

  return (
    <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
      <Button variant="ghost" size="icon" onClick={restartEngine} title="Restart Audio Engine">
        <HugeiconsIcon icon={Refresh01Icon} className="size-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === "light" ? <HugeiconsIcon icon={MoonIcon} className="size-5" /> : <HugeiconsIcon icon={SunIcon} className="size-5" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={openSettings}>
        <HugeiconsIcon icon={Settings02Icon} className="size-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="hidden sm:inline-flex">
        <HugeiconsIcon icon={Maximize01Icon} className="size-5" />
      </Button>
    </div>
  );
}
