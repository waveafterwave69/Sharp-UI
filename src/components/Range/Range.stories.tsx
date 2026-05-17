import type { Meta, StoryObj } from '@storybook/react-vite'
import Range from './Range'

const meta: Meta<typeof Range> = {
    title: 'Компоненты/Range',
    component: Range,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Range>

export const Default: Story = {
    args: {
        min: 0,
        max: 100,
        step: 1,
        value: { min: 20, max: 80 },
        appearance: 'primary',
        size: 'md',
    },
}
