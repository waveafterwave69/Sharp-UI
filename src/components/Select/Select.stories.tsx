import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'Компоненты/Select',
    component: Select,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Playground: Story = {
    args: {
        label: 'Согласны?',
        title: 'Выберите...',
        appearance: 'primary',
        size: 'md',
        borderRadius: 'none',
        options: [
            { label: 'Да', value: true },
            { label: 'Нет', value: false }
        ],
        disabled: false,
        error: 'Не выбрано',
    },

    render: (args) => {
        const [value, setValue] = useState<boolean | null>(null);

        return (
            <Select
                {...args}
                value={value}
                onChange={(v) =>setValue(v)}
            />
        );
    }
};