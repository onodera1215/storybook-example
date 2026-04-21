import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Card Title',
    children:
      'This is the body of the card. It can contain arbitrary React nodes including text, images, and other components.',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { variant: 'default' },
};

export const Elevated: Story = {
  args: { variant: 'elevated' },
};

export const Bordered: Story = {
  args: { variant: 'bordered' },
};

export const WithFooter: Story = {
  args: {
    variant: 'default',
    footer: (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>
    ),
  },
};

export const NoTitle: Story = {
  args: { title: undefined },
};

export const LongContent: Story = {
  args: {
    children: Array.from({ length: 6 })
      .map(
        (_, i) =>
          `Paragraph ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      )
      .join(' '),
  },
};
