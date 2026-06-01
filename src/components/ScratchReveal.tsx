"use client";

import { Check, Sparkles } from "lucide-react";
import { PointerEvent, useEffect, useRef, useState } from "react";
import type { Peak } from "@/types/domain";

interface ScratchRevealProps {
  peak: Peak;
  onComplete: () => void;
}

export function ScratchReveal({ peak, onComplete }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * window.devicePixelRatio);
      canvas.height = Math.floor(rect.height * window.devicePixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#3b3e40");
      gradient.addColorStop(0.45, "#171717");
      gradient.addColorStop(1, "#6f674f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 70; i += 1) {
        ctx.fillStyle = i % 3 === 0 ? "#fff0c1" : "#0e0f0f";
        ctx.beginPath();
        ctx.arc(Math.random() * rect.width, Math.random() * rect.height, Math.random() * 24 + 8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function scratch(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < sample.length; i += 64) {
      if (sample[i] < 20) clear += 1;
    }
    setProgress(Math.min(100, Math.round((clear / (sample.length / 64 / 4)) * 100)));
  }

  return (
    <div className="scratch-screen" role="dialog" aria-modal="true">
      <div className="scratch-card">
        <div className="revealed-peak">
          <Sparkles size={28} />
          <span>{peak.region}</span>
          <h2>{peak.name}</h2>
          <strong>{peak.xpReward} XP</strong>
        </div>
        <canvas
          ref={canvasRef}
          onPointerDown={(event) => {
            drawingRef.current = true;
            scratch(event);
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            drawingRef.current = false;
          }}
          onPointerLeave={() => {
            drawingRef.current = false;
          }}
        />
      </div>
      <div className="scratch-controls">
        <span>{progress}% açıldı</span>
        <button className="primary-action" onClick={onComplete} disabled={progress < 35}>
          <Check size={18} />
          Zirveyi Aç
        </button>
      </div>
    </div>
  );
}
