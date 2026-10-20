"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-brand-100 text-brand-600 ${className}`}>
        <ImageOff className="size-8" aria-hidden />
      </div>
    );
  }
  return (
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
  );
}