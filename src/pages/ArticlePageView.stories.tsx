import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePageView } from './ArticlePageView';
import {
  mockFreeArticle,
  mockPremiumArticle,
  mockEnterpriseArticle,
} from './__mocks__/articleData';

/**
 * These stories render the page by passing the `article` prop directly.
 *
 * Advantages:
 *   - No network, no MSW, no async — purely deterministic
 *   - Fastest to capture (no delay needed)
 *   - Best suited for VRT: stable pixels, no flakes
 *
 * Use this style for the bulk of your VRT coverage.
 * Use the `ArticlePage` (container) stories only when you specifically
 * need to verify loading/error states or fetch-layer integration.
 */
const meta: Meta<typeof ArticlePageView> = {
  title: 'Pages/ArticlePageView (props-only)',
  component: ArticlePageView,
  parameters: {
    layout: 'fullscreen',
    screenshot: {
      viewports: {
        sp: { width: 375, height: 2400 },
        pc: { width: 1280, height: 2400 },
      },
      fullPage: true,
      delay: 300,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticlePageView>;

export const FreePlan: Story = {
  args: { article: mockFreeArticle },
};

export const PremiumPlan: Story = {
  args: { article: mockPremiumArticle },
};

export const EnterprisePlan: Story = {
  args: { article: mockEnterpriseArticle },
};
