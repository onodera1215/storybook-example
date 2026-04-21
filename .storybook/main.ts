import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Serve `public/` so MSW's service worker (mockServiceWorker.js) is reachable.
  staticDirs: ['../public'],
  docs: {
    autodocs: false,
  },
};

export default config;
