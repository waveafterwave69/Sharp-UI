import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './Button'

const meta: Meta<typeof Button> = {
    title: 'Компоненты/Button',
    component: Button,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        appearance: 'primary',
        children: 'Кнопка',
        borderRadius: 'none',
    },
}

export const Secondary: Story = {
    args: {
        appearance: 'secondary',
        children: 'Кнопка',
    },
}

export const Small: Story = {
    args: {
        appearance: 'primary',
        size: 'sm',
        children: 'Кнопка',
    },
}

export const Large: Story = {
    args: {
        appearance: 'primary',
        size: 'lg',
        children: 'Кнопка',
    },
}
