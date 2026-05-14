import type { Meta, StoryObj } from '@storybook/react'
import Uploader from './Uploader'

const meta: Meta<typeof Uploader> = {
    title: 'Компоненты/Uploader',
    component: Uploader,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Uploader>

export const Default: Story = {
    args: {
        text: 'Файл может быть любого разрешение от ... до ...',
        title: 'Загрузите файл',
    },
}
