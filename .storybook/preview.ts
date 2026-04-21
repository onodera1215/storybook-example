import type { Preview } from '@storybook/react';
import { withScreenshot } from 'storycap';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';

// Start MSW in the browser before any story runs.
// `onUnhandledRequest: 'bypass'` lets Storybook's own fetches (HMR etc.) pass through.
initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  parameters: {
    layout: 'padded',
    screenshot: {
      viewports: {
        sp: { width: 375, height: 667 },
        pc: { width: 1280, height: 800 },
      },
      fullPage: false,
      delay: 200,
    },
  },
  loaders: [mswLoader],
  decorators: [withScreenshot],
};

export default preview;
