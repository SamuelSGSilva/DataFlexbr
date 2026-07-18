import { WHATSAPP_NUMBER } from "@/lib/products";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12.04 2c-5.5 0-10 4.5-10 10 0 1.77.46 3.44 1.27 4.89L2 22l5.25-1.28A9.96 9.96 0 0 0 12.04 22c5.5 0 10-4.5 10-10s-4.5-10-10-10Zm5.8 14.24c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.05.24-3.53-.74-2.99-1.19-4.9-4.24-5.05-4.44-.15-.2-1.22-1.62-1.22-3.1s.78-2.2 1.05-2.5c.28-.3.6-.37.8-.37h.58c.19 0 .43-.03.67.51.24.55.83 1.9.9 2.04.07.14.12.3.02.5-.1.2-.15.32-.3.5-.15.17-.3.38-.44.5-.15.15-.3.3-.13.6.17.3.76 1.25 1.64 2.03 1.13 1 2.08 1.32 2.38 1.47.3.15.48.13.65-.08.17-.2.73-.86.93-1.15.2-.3.4-.24.66-.14.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.17 1.43Z" />
      </svg>
    </a>
  );
}
