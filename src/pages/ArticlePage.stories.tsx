import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { ArticlePage } from './ArticlePage';
import {
  mockFreeArticle,
  mockPremiumArticle,
  mockEnterpriseArticle,
} from './__mocks__/articleData';

/**
 * These stories render the container component which calls `fetch()` internally.
 * MSW intercepts the request and returns the mocked article data.
 *
 * Use this style when you want to:
 *   - Verify loading / error UI states
 *   - Test that the container correctly wires data into the view
 *   - Exercise fetch-layer behavior (retry, auth, etc.) without a real backend
 *
 * Note: VRT on these stories requires a larger `delay` so the fetch resolves
 * before the screenshot is taken. If you only care about final-rendered output,
 * prefer the props-only `ArticlePageView` stories.
 */
const meta: Meta<typeof ArticlePage> = {
  title: 'Pages/ArticlePage (MSW)',
  component: ArticlePage,
  parameters: {
    layout: 'fullscreen',
    screenshot: {
      viewports: {
        sp: { width: 375, height: 2400 },
        pc: { width: 1280, height: 2400 },
      },
      fullPage: true,
      // Wait for MSW to resolve + React to commit.
      // Tune this if you see blank screenshots.
      delay: 800,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticlePage>;

export const FreePlan: Story = {
  args: { articleId: 'free-1' },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/articles/:id', () => HttpResponse.json(mockFreeArticle)),
      ],
    },
  },
};

export const PremiumPlan: Story = {
  args: { articleId: 'premium-1' },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/articles/:id', () =>
          HttpResponse.json(mockPremiumArticle)
        ),
      ],
    },
  },
};

export const EnterprisePlan: Story = {
  args: { articleId: 'enterprise-1' },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/articles/:id', () =>
          HttpResponse.json(mockEnterpriseArticle)
        ),
      ],
    },
  },
};

/** Loading state: MSW delays the response indefinitely. */
export const Loading: Story = {
  args: { articleId: 'loading-demo' },
  parameters: {
    screenshot: { delay: 300 }, // Capture before the response arrives
    msw: {
      handlers: [
        http.get('/api/articles/:id', async () => {
          await delay('infinite');
          return HttpResponse.json(mockFreeArticle);
        }),
      ],
    },
  },
};

/** Error state: MSW returns 500. */
export const Error: Story = {
  args: { articleId: 'error-demo' },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/articles/:id', () =>
          HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
        ),
      ],
    },
  },
};
