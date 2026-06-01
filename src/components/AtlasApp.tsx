"use client";

import { Award, Compass, Map, Mountain, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { badges, initialUserBadges, initialUserPeaks, mockUser, peaks } from "@/data/mock";
import { getCompletedPeakIds, getCompletionXp, getEarnedBadgeIds, getPeakBadge } from "@/lib/progression";
import type { CompletionDraft, Peak, UserBadge, UserPeak } from "@/types/domain";
import { AchievementView } from "./AchievementView";
import { MapScene } from "./MapScene";
import { PeakDetailModal } from "./PeakDetailModal";
import { PeakFormModal } from "./PeakFormModal";
import { ProfileView } from "./ProfileView";
import { PwaRegister } from "./PwaRegister";
import { ScratchReveal } from "./ScratchReveal";

type ViewMode = "landing" | "map" | "profile" | "badges";

export function AtlasApp() {
  const [view, setView] = useState<ViewMode>("landing");
  const [activePeak, setActivePeak] = useState<Peak | null>(null);
  const [formPeak, setFormPeak] = useState<Peak | null>(null);
  const [scratchDraft, setScratchDraft] = useState<CompletionDraft | null>(null);
  const [userPeaks, setUserPeaks] = useState<UserPeak[]>(initialUserPeaks);
  const [userBadges, setUserBadges] = useState<UserBadge[]>(initialUserBadges);

  const completedPeakIds = useMemo(() => getCompletedPeakIds(userPeaks), [userPeaks]);
  const earnedBadgeIds = useMemo(() => getEarnedBadgeIds(userBadges), [userBadges]);
  const xpFromProgress = useMemo(() => getCompletionXp(userPeaks, userBadges, peaks), [userBadges, userPeaks]);
  const totalXp = mockUser.xp + xpFromProgress;
  const level = Math.max(mockUser.level, Math.floor(totalXp / 500) + 1);
  const selectedScratchPeak = scratchDraft ? peaks.find((peak) => peak.id === scratchDraft.peakId) ?? null : null;

  function finishScratch() {
    if (!scratchDraft || !selectedScratchPeak) return;

    const now = new Date().toISOString();
    const newPeak: UserPeak = {
      id: `user-peak-${scratchDraft.peakId}-${Date.now()}`,
      userId: mockUser.id,
      peakId: scratchDraft.peakId,
      completedAt: scratchDraft.completedAt,
      note: scratchDraft.note,
      photoDataUrl: scratchDraft.photoDataUrl
    };

    setUserPeaks((current) => [...current.filter((entry) => entry.peakId !== scratchDraft.peakId), newPeak]);

    setUserBadges((current) => {
      const existing = new Set(current.map((entry) => entry.badgeId));
      const next = [...current];
      const peakBadge = getPeakBadge(selectedScratchPeak);

      if (peakBadge && !existing.has(peakBadge.id)) {
        next.push({ id: `user-badge-${peakBadge.id}-${Date.now()}`, userId: mockUser.id, badgeId: peakBadge.id, earnedAt: now });
        existing.add(peakBadge.id);
      }

      if (userPeaks.length === 0 && !existing.has("first-reveal")) {
        next.push({ id: `user-badge-first-reveal-${Date.now()}`, userId: mockUser.id, badgeId: "first-reveal", earnedAt: now });
      }

      return next;
    });

    setScratchDraft(null);
    setActivePeak(selectedScratchPeak);
    setView("map");
  }

  return (
    <main className="app-shell">
      <PwaRegister />
      <section className="phone-frame">
        <header className="top-bar">
          <button className="brand-lockup" onClick={() => setView("landing")} aria-label="Atlasio ana ekran">
            <span className="brand-mark">A</span>
            <span>
              <strong>Atlasio</strong>
              <small>Mastika MVP</small>
            </span>
          </button>
          <div className="xp-pill">
            <Award size={15} />
            <span>{totalXp} XP</span>
          </div>
        </header>

        {view === "landing" && (
          <section className="landing-panel">
            <div className="hero-map-preview">
              <MapScene peaks={peaks} completedPeakIds={completedPeakIds} onPeakSelect={setActivePeak} compact />
            </div>
            <div className="landing-copy">
              <span className="eyebrow">oyun atlası</span>
              <h1>Türkiye’yi zirve zirve aç.</h1>
              <p>Fotoğrafını ekle, notunu bırak, sisli haritayı kazıyarak tamamladığın zirveyi parlat.</p>
              <button className="primary-action" onClick={() => setView("map")}>
                <Compass size={18} />
                Atlasa Başla
              </button>
            </div>
          </section>
        )}

        {view === "map" && (
          <section className="map-view">
            <div className="map-stage">
              <MapScene peaks={peaks} completedPeakIds={completedPeakIds} onPeakSelect={setActivePeak} />
            </div>
            <aside className="desktop-atlas-panel" aria-label="Zirve listesi">
              <div className="section-heading">
                <span className="eyebrow">sınır verisi modu</span>
                <h1>Türkiye atlası</h1>
                <p>Sınır mesh’i ayrı veri dosyasından üretiliyor; GeoJSON geldiğinde aynı pipeline gerçek koordinatla beslenecek.</p>
              </div>
              <div className="map-status">
                <span>{completedPeakIds.size}/{peaks.length} zirve açıldı</span>
                <strong>{peaks.length - completedPeakIds.size} sisli nokta kaldı</strong>
              </div>
              <div className="peak-list">
                {peaks.map((peak) => (
                  <button key={peak.id} className={completedPeakIds.has(peak.id) ? "revealed" : ""} onClick={() => setActivePeak(peak)}>
                    <span />
                    <strong>{peak.name}</strong>
                    <small>
                      {peak.region} · {peak.elevationMeters} m · {peak.geoPosition.latitude.toFixed(2)},{" "}
                      {peak.geoPosition.longitude.toFixed(2)}
                    </small>
                  </button>
                ))}
              </div>
            </aside>
            <div className="map-status mobile-map-status">
              <span>{completedPeakIds.size}/{peaks.length} zirve açıldı</span>
              <strong>{peaks.length - completedPeakIds.size} sisli nokta kaldı</strong>
            </div>
          </section>
        )}

        {view === "profile" && (
          <ProfileView user={mockUser} level={level} totalXp={totalXp} userPeaks={userPeaks} peaks={peaks} />
        )}

        {view === "badges" && (
          <AchievementView badges={badges} earnedBadgeIds={earnedBadgeIds} userBadges={userBadges} />
        )}

        {activePeak && (
          <PeakDetailModal
            peak={activePeak}
            isCompleted={completedPeakIds.has(activePeak.id)}
            userPeak={userPeaks.find((entry) => entry.peakId === activePeak.id)}
            onClose={() => setActivePeak(null)}
            onStart={() => {
              setFormPeak(activePeak);
              setActivePeak(null);
            }}
          />
        )}

        {formPeak && (
          <PeakFormModal
            peak={formPeak}
            onClose={() => setFormPeak(null)}
            onSubmit={(draft) => {
              setFormPeak(null);
              setScratchDraft(draft);
            }}
          />
        )}

        {scratchDraft && selectedScratchPeak && <ScratchReveal peak={selectedScratchPeak} onComplete={finishScratch} />}

        {view !== "landing" && (
          <nav className="bottom-nav" aria-label="Ana gezinme">
            <button className={view === "map" ? "active" : ""} onClick={() => setView("map")}>
              <Map size={20} />
              <span>Atlas</span>
            </button>
            <button className={view === "badges" ? "active" : ""} onClick={() => setView("badges")}>
              <Award size={20} />
              <span>Rozet</span>
            </button>
            <button className={view === "profile" ? "active" : ""} onClick={() => setView("profile")}>
              <UserRound size={20} />
              <span>Profil</span>
            </button>
          </nav>
        )}

        <div className="ambient-glow" />
        <Mountain className="corner-glyph" size={180} strokeWidth={0.5} />
      </section>
    </main>
  );
}
