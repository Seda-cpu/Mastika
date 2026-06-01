"use client";

import { Flame, Mountain, Trophy } from "lucide-react";
import type { Peak, User, UserPeak } from "@/types/domain";

interface ProfileViewProps {
  user: User;
  level: number;
  totalXp: number;
  userPeaks: UserPeak[];
  peaks: Peak[];
}

export function ProfileView({ user, level, totalXp, userPeaks, peaks }: ProfileViewProps) {
  const nextLevelXp = level * 500;
  const progress = Math.min(100, Math.round((totalXp / nextLevelXp) * 100));
  const completedPeaks = userPeaks
    .map((entry) => peaks.find((peak) => peak.id === entry.peakId))
    .filter((peak): peak is Peak => Boolean(peak));

  return (
    <section className="panel-view profile-view">
      <div className="profile-card">
        <div className="avatar">{user.avatarInitials}</div>
        <div>
          <span className="eyebrow">{user.homeRegion}</span>
          <h1>{user.displayName}</h1>
          <p>Seviye {level} atlas gezgini</p>
        </div>
      </div>

      <div className="level-card">
        <div>
          <span>XP</span>
          <strong>{totalXp}</strong>
        </div>
        <div className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
        <small>{nextLevelXp - totalXp > 0 ? `${nextLevelXp - totalXp} XP sonra seviye ${level + 1}` : "Yeni seviye hazır"}</small>
      </div>

      <div className="summary-grid">
        <div>
          <Mountain size={18} />
          <strong>{userPeaks.length}</strong>
          <span>Zirve</span>
        </div>
        <div>
          <Trophy size={18} />
          <strong>{peaks.length - userPeaks.length}</strong>
          <span>Kalan</span>
        </div>
        <div>
          <Flame size={18} />
          <strong>{Math.max(1, userPeaks.length)}</strong>
          <span>Seri</span>
        </div>
      </div>

      <div className="history-list">
        <h2>Son Açılanlar</h2>
        {completedPeaks.map((peak) => (
          <article key={peak.id} className="history-row">
            <span />
            <div>
              <strong>{peak.name}</strong>
              <small>{peak.region}</small>
            </div>
            <em>{peak.xpReward} XP</em>
          </article>
        ))}
      </div>
    </section>
  );
}
