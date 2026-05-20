import type { Meta, StoryObj } from '@storybook/react'
import Uploader from './Uploader'
import { useArgs } from 'storybook/internal/preview-api'

const meta: Meta<typeof Uploader> = {
    title: 'Компоненты/Uploader',
    component: Uploader,
    tags: ['autodocs'],
    decorators: [
        (Story, context) => {
            const [, updateArgs] = useArgs()

            const handleFilesSelect = (newFiles: File[]) => {
                updateArgs({ selectedFiles: newFiles })
                context.args.onFilesSelect?.(newFiles)
            }

            return (
                <Story
                    args={{ ...context.args, onFilesSelect: handleFilesSelect }}
                />
            )
        },
    ],
}

export default meta
type Story = StoryObj<typeof Uploader>

export const Default: Story = {
    args: {
        title: 'Загрузите файл',
        text: 'Перетащите файл сюда или нажмите для выбора',
        multiple: false,
        selectedFiles: [],
    },
}
