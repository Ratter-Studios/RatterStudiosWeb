import { useState } from "react";
import { QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { websiteImg } from "@/lib/assets";

// Saved the Discord QR image here: img/website/discord-qr.png
const qrSrc = websiteImg("discord-qr.png");

export function DiscordQr() {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      aria-label={open ? "Hide Discord invite QR code" : "Show Discord invite QR code"}
      className={cn(
        "btn-ratter shrink-0 overflow-hidden rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "h-40 w-40 p-2" : "h-9 w-9",
      )}
    >
      {open ? (
        <img src={qrSrc} alt="" className="h-full w-full rounded-lg object-contain" />
      ) : (
        <QrCode aria-hidden className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
}
