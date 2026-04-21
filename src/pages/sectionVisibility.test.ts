/**
 * Unit tests for the pure visibility function.
 *
 * This file is illustrative — it uses Node's built-in `node:test` runner
 * so you can execute it with zero extra dependencies:
 *
 *   node --import tsx --test src/pages/sectionVisibility.test.ts
 *
 * In a real project you'd normally use Vitest or Jest instead:
 *
 *   // vitest version
 *   import { describe, it, expect } from 'vitest';
 *   import { getSectionVisibility } from './sectionVisibility';
 *
 *   describe('getSectionVisibility', () => {
 *     it('free plan hides comments and related, shows paywall', () => {
 *       expect(getSectionVisibility('free')).toEqual({
 *         paywall: true, comments: false, related: false,
 *       });
 *     });
 *   });
 *
 * The point: plan-branching rules are tested *without rendering any React*.
 * This catches regressions in business logic independently of VRT.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getSectionVisibility } from './sectionVisibility';

describe('getSectionVisibility', () => {
  it('free plan → paywall only', () => {
    assert.deepEqual(getSectionVisibility('free'), {
      paywall: true,
      comments: false,
      related: false,
    });
  });

  it('premium plan → comments but no related, no paywall', () => {
    assert.deepEqual(getSectionVisibility('premium'), {
      paywall: false,
      comments: true,
      related: false,
    });
  });

  it('enterprise plan → everything except paywall', () => {
    assert.deepEqual(getSectionVisibility('enterprise'), {
      paywall: false,
      comments: true,
      related: true,
    });
  });
});
