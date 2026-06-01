"use client";

import { Crown, Flame, Gem, Shield, Sparkles, Sun, TreePine, WandSparkles, Waves } from "lucide-react";
import type { Badge, UserBadge } from "@/types/domain";

interface AchievementViewProps {
  badges: Badge[];
  earnedBadgeIds: Set<string>;
  userBadges: UserBadge[];
}

const iconMap = {
  flame: Flame,
  waves: Waves,
  crown: Crown,
  shield: Shield,
  sparkle: Sparkles,
  gem: Gem,
  tree: TreePine,
  sun: Sun,
  wand: WandSparkles
};

export function AchievementView({ badges, earnedBadgeIds, userBadges }: AchievementViewProps) {
  return (
    <section className="panel-view badges-view">
      <div className="section-heading">
        <span className="eyebrow">{userBadges.length} rozet kazanıldı</span>
        <h1>Başarımlar</h1>
      </div>
      <div className="badge-grid">
        {badges.map((badge) => {
          const Icon = iconMap[badge.icon as keyof typeof iconMap] ?? Sparkles;
          const earned = earnedBadgeIds.has(badge.id);
          return (
            <article className={earned ? "badge-card earned" : "badge-card"} key={badge.id}>
              <div>
                <Icon size={24} />
              </div>
              <strong>{badge.name}</strong>
              <p>{badge.description}</p>
              <span>{badge.xpReward} XP</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
