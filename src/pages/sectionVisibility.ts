import type { Tier } from '../api/articleApi';

/**
 * Pure function that determines section visibility per tier.
 *
 * This mirrors the `isAdvancePlan / isMasterPlan / isLightPlan` branching
 * pattern often found in plan-based UI code. By extracting the rules into
 * a pure function, they become unit-testable without rendering any React,
 * and the JSX stays declarative:
 *
 *   {visibility.comments && <CommentsSection ... />}
 */
export interface SectionVisibility {
  paywall: boolean; // Show locked-content CTA
  comments: boolean; // Show comments section
  related: boolean; // Show related articles
}

export function getSectionVisibility(tier: Tier): SectionVisibility {
  return {
    paywall: tier === 'free',
    comments: tier === 'premium' || tier === 'enterprise',
    related: tier === 'enterprise',
  };
}
