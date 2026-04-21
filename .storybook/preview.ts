import type { Preview } from '@storybook/react';
import { withScreenshot } from 'storycap';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    screenshot: {
      // Default: capture at both mobile and desktop widths
      viewports: {
        sp: { width: 375, height: 667 },
        pc: { width: 1280, height: 800 },
      },
      fullPage: false,
      delay: 200,
    },
  },
  decorators: [withScreenshot],
};

export default preview;
