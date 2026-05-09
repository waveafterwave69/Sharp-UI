import type { Meta, StoryObj } from '@storybook/react-vite'
import Loading from './Loading'

const meta: Meta<typeof Loading> = {
    title: 'Компоненты/Loading',
    component: Loading,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Loading>

export const Primary: Story = {
    args: { variant: 'spinner', appearance: 'primary' },
}
