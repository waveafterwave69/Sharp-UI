import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './Button'

import testImg from '../../shared/notification-bell.png'

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

export const ButtonWithImg: Story = {
    args: {
        appearance: 'primary',
        children: 'Кнопка',
        borderRadius: 'none',
        imgRight: testImg,
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
