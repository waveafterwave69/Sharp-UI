import type { Meta, StoryObj } from '@storybook/react' // Изменено на общий тип, если нужно

import Range from './Range'
import { useArgs } from 'storybook/internal/preview-api'

const meta: Meta<typeof Range> = {
    title: 'Компоненты/Range',
    component: Range,
    tags: ['autodocs'],
    decorators: [
        (Story, context) => {
            const [, updateArgs] = useArgs()

            const handleChange = (newValue: { min: number; max: number }) => {
                updateArgs({ value: newValue })
                context.args.onChange?.(newValue)
            }

            return <Story args={{ ...context.args, onChange: handleChange }} />
        },
    ],
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
