import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

type TextareaStoryArgs = React.ComponentProps<typeof Textarea> & {
    maxHeight?: number | string
    placeholder?: string
}

const meta: Meta<TextareaStoryArgs> = {
    title: 'Компоненты/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {
        appearance: {
            control: 'select',
            options: ['primary', 'secondary'],
            description: 'Внешний вид (из контекста)',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Размер (из контекста)',
        },
        borderRadius: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Радиус скругления (из контекста)',
        },
        error: {
            control: 'boolean',
        },
        maxHeight: {
            control: 'number',
            description: 'Максимальная высота поля в px',
        },
        placeholder: {
            control: 'text',
        },
    },
}

export default meta
type Story = StoryObj<TextareaStoryArgs>

export const Default: Story = {
    args: {
        appearance: 'primary',
        size: 'md',
        borderRadius: 'sm',
        error: false,
        errorId: 'textarea-err',
        maxHeight: 200,
        placeholder: 'Введите текст...',
    },
    render: (args) => {
        const { maxHeight, placeholder, ...rootArgs } = args
        return (
            <Textarea {...rootArgs}>
                <Textarea.Label>Комментарий</Textarea.Label>
                <Textarea.Field
                    placeholder={placeholder}
                    rows={1}
                    maxHeight={maxHeight}
                />
                <Textarea.Error>Это поле обязательно</Textarea.Error>
            </Textarea>
        )
    },
}
