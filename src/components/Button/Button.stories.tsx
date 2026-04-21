import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Click me',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// --- Variants ---
export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

// --- Sizes ---
export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

// --- States ---
export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width Button' },
};

// --- Combo: all variants rendered together for holistic VRT ---
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="primary" size="sm">
          Primary SM
        </Button>
        <Button variant="primary" size="md">
          Primary MD
        </Button>
        <Button variant="primary" size="lg">
          Primary LG
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="secondary" size="sm">
          Secondary SM
        </Button>
        <Button variant="secondary" size="md">
          Secondary MD
        </Button>
        <Button variant="secondary" size="lg">
          Secondary LG
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="danger" size="sm">
          Danger SM
        </Button>
        <Button variant="danger" size="md">
          Danger MD
        </Button>
        <Button variant="danger" size="lg">
          Danger LG
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="primary" disabled>
          Disabled Primary
        </Button>
        <Button variant="secondary" disabled>
          Disabled Secondary
        </Button>
        <Button variant="danger" disabled>
          Disabled Danger
        </Button>
      </div>
    </div>
  ),
};
