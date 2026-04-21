import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Gray: Story = { args: { color: 'gray' } };
export const Blue: Story = { args: { color: 'blue' } };
export const Green: Story = { args: { color: 'green' } };
export const Red: Story = { args: { color: 'red' } };
export const Yellow: Story = { args: { color: 'yellow' } };

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge color="gray">Default</Badge>
      <Badge color="blue">Info</Badge>
      <Badge color="green">Success</Badge>
      <Badge color="yellow">Warning</Badge>
      <Badge color="red">Error</Badge>
    </div>
  ),
};
