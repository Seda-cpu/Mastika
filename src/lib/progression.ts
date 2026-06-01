import { badges } from "@/data/mock";
import type { Badge, Peak, UserBadge, UserPeak } from "@/types/domain";

export function getCompletedPeakIds(userPeaks: UserPeak[]) {
  return new Set(userPeaks.map((entry) => entry.peakId));
}

export function getEarnedBadgeIds(userBadges: UserBadge[]) {
  return new Set(userBadges.map((entry) => entry.badgeId));
}

export function getPeakBadge(peak: Peak): Badge | undefined {
  return badges.find((badge) => badge.id === peak.badgeId);
}

export function getCompletionXp(userPeaks: UserPeak[], userBadges: UserBadge[], peaks: Peak[]) {
  const peakXp = userPeaks.reduce((total, entry) => {
    const peak = peaks.find((item) => item.id === entry.peakId);
    return total + (peak?.xpReward ?? 0);
  }, 0);

  const badgeXp = userBadges.reduce((total, entry) => {
    const badge = badges.find((item) => item.id === entry.badgeId);
    return total + (badge?.xpReward ?? 0);
  }, 0);

  return peakXp + badgeXp;
}
