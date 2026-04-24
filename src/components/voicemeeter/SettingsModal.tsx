"use client";

import { useVoicemeeterStore } from "@/hooks/use-voicemeeter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function SettingsModal() {
  const { targetIp, setTargetIp, isConnected, connect } = useVoicemeeterStore();
  const [ip, setIp] = useState(targetIp);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // If not connected and we have a default IP, try to connect
    if (!isConnected && targetIp) {
      connect();
    }
    // If we have never set an IP or we're explicitly trying to start and failing, open modal.
    // For simplicity, we just force open if no targetIp is configured yet (default is '127.0.0.1:3001').
  }, [targetIp, isConnected, connect]);

  const handleSave = () => {
    setTargetIp(ip);
    setOpen(false);
  };

  // expose a way to open manually via window event or ref if needed
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-settings", handleOpen);
    return () => window.removeEventListener("open-settings", handleOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect to VoiceMeeter</DialogTitle>
          <DialogDescription>
            Enter the IP Address and Port of the device running the VoiceMeeter Controller Server.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ip-address">Target Server (IP:Port)</Label>
            <Input 
              id="ip-address" 
              value={ip} 
              onChange={(e) => setIp(e.target.value)} 
              placeholder="e.g. 192.168.1.100:3001" 
            />
          </div>
        </div>
        <Button onClick={handleSave}>Save & Connect</Button>
      </DialogContent>
    </Dialog>
  );
}
