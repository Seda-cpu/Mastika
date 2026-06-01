"use client";

import { CalendarDays, Camera, CheckCircle2, MapPin, Mountain, X } from "lucide-react";
import type { Peak, UserPeak } from "@/types/domain";

interface PeakDetailModalProps {
  peak: Peak;
  isCompleted: boolean;
  userPeak?: UserPeak;
  onClose: () => void;
  onStart: () => void;
}

export function PeakDetailModal({ peak, isCompleted, userPeak, onClose, onStart }: PeakDetailModalProps) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="sheet peak-sheet">
        <button className="icon-button sheet-close" onClick={onClose} aria-label="Kapat">
          <X size={20} />
        </button>
        <div className={isCompleted ? "peak-orb complete" : "peak-orb"}>
          <Mountain size={38} />
        </div>
        <div className="sheet-heading">
          <span className="eyebrow">{peak.region}</span>
          <h2>{peak.name}</h2>
          <p>{peak.lore}</p>
        </div>
        <div className="stat-grid">
          <div>
            <MapPin size={16} />
            <span>
              {peak.geoPosition.latitude.toFixed(2)}, {peak.geoPosition.longitude.toFixed(2)}
            </span>
          </div>
          <div>
            <Mountain size={16} />
            <span>{peak.elevationMeters} m</span>
          </div>
          <div>
            <CheckCircle2 size={16} />
            <span>{peak.xpReward} XP</span>
          </div>
        </div>

        {isCompleted && userPeak ? (
          <div className="completion-note">
            <div>
              <CalendarDays size={16} />
              <span>{new Date(userPeak.completedAt).toLocaleDateString("tr-TR")}</span>
            </div>
            {userPeak.photoDataUrl && <img src={userPeak.photoDataUrl} alt={`${peak.name} yuklenen fotograf`} />}
            <p>{userPeak.note || "Bu zirve atlasinda acildi."}</p>
          </div>
        ) : (
          <button className="primary-action wide" onClick={onStart}>
            <Camera size={18} />
            Zirveye Çıktım
          </button>
        )}
      </section>
    </div>
  );
}
