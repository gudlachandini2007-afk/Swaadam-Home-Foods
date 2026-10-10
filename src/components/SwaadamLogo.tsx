import React from "react";

interface SwaadamLogoProps {
  className?: string;
  size?: number; // width in pixels
  lightMode?: boolean;
}

export function SwaadamLogo({ className = "", size = 200, lightMode = false }: SwaadamLogoProps) {
  // Use the clear, high-definition authentic branding logo URL requested by the user
  const logoUrl = "https://res.cloudinary.com/dplgcubw5/image/upload/f_auto,q_auto,w_400/v1782034552/logo_rusoyn.jpg";

  return (
    <div
      className={`inline-block overflow-hidden rounded-2xl border-2 border-[#dfba73] shadow-lg shadow-[#dfba73]/15 transition-all duration-300 select-none ${className}`}
      style={{ width: `${size}px` }}
    >
      <img
        src={logoUrl}
        alt="Swaadam Home Foods"
        referrerPolicy="no-referrer"
        loading="eager" decoding="async" className="w-full h-auto object-cover block"
      />
    </div>
  );
}
