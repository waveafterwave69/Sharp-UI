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

export const ButtonWithImg: Story = {
    args: {
        appearance: 'primary',
        children: 'Кнопка',
        borderRadius: 'none',
        imgRight: 'https://cdn-icons-png.flaticon.com/512/9288/9288684.png',
    },
}
