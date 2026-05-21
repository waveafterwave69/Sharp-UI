import type { Meta, StoryObj } from '@storybook/react-vite'
import { createElement, useState } from 'react'
import DatePicker from './DatePicker'

const meta: Meta<typeof DatePicker> = {
    title: 'Компоненты/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Playground: Story = {
    args: {
        label: 'Дата',
        placeholder: 'Выберите дату',
        appearance: 'primary',
        size: 'md',
        borderRadius: 'none',
        disabled: false,
        error: null,
        value: null,
        onChange: () => undefined,
    },
    render: (args) => {
        const [value, setValue] = useState<Date | null>(args.value ?? null)

        return createElement(DatePicker, {
            ...args,
            value,
            onChange: setValue,
        })
    },
}
