"use client";

import { useVoicemeeterStore } from "@/hooks/use-voicemeeter";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RoutingOption {
  label: string;
  param: string;
}

interface ChannelStripProps {
  label: string;
  gainParam: string;
  muteParam: string;
  routingOptions?: RoutingOption[];
  className?: string;
  renderHeader?: React.ReactNode;
}

export function ChannelStrip({ label, gainParam, muteParam, routingOptions, className, renderHeader }: ChannelStripProps) {
  const { parameters, setParameter } = useVoicemeeterStore();

  const gain = parameters[gainParam] ?? 0;
  const isMuted = parameters[muteParam] === 1;
  const isLoud = gain > 0;

  return (
    <div className={cn("flex flex-col items-center gap-3 p-3 bg-muted/30 rounded-xl border", className)}>
      {renderHeader ? (
        renderHeader
      ) : (
        <span className="text-sm font-semibold truncate w-full text-center">{label}</span>
      )}


      {/* Fader */}
      <div className={cn("-flex1 min-h-[200px] h-full  items-center justify-center md:py-4 w-full", routingOptions && "grid grid-cols-2")}>
        <div className="flex flex-col items-center gap-2 h-full">
          <div className="text-xs font-mono mb-1">{gain.toFixed(1)} dB</div>
          <Slider
            orientation="vertical"
            min={-60}
            max={12}
            step={0.1}
            value={[gain]}
            onDoubleClick={() => setParameter(gainParam, 0)}
            onValueChange={(vals: any) => setParameter(gainParam, Array.isArray(vals) ? vals[0] : vals)}
            thumbClassName={cn(isMuted && "opacity-80")}
            trackClassName={cn(isMuted && "opacity-50", isLoud ? "bg-red-500" : "bg-green-500")}
          />
        </div>
        {/* Routing Buttons */}
        {routingOptions && routingOptions.length > 0 && (
          <div className="flex flex-col md:gap-5">
            {routingOptions.map((opt) => {
              const isActive = parameters[opt.param] === 1;
              return (
                <Button
                  key={opt.param}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setParameter(opt.param, isActive ? 0 : 1)}
                >
                  {opt.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mute Button */}
      <Button
        variant={isMuted ? "destructive" : "secondary"}
        className={cn("w-full transition-colors md:block hidden ", isMuted && "animate-pulse")}
        onClick={() => setParameter(muteParam, isMuted ? 0 : 1)}
      >
        M
      </Button>
    </div>
  );
}
