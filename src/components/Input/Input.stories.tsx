import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import SearchIcon from './assets/search.svg?react'

type PlaygroundArgs = {
    label: string;
    placeholder: string;
    error: boolean;
    errorText: string;

    appearance: 'primary' | 'secondary';
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    borderRadius: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    id: string;
    htmlFor: string;
};

const meta: Meta<typeof Input> = {
    title: 'Компоненты/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        appearance: {
            control: 'select',
            options: ['primary', 'secondary'],
            table: { category: 'Global' },
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            table: { category: 'Global' }
        },
        borderRadius: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
            table: { category: 'Global' },
        },
    }
}

export default meta;

export const Playground: StoryObj<PlaygroundArgs> = {
    args: {
        label: 'Email',
        placeholder: 'Введите email',
        error: false,
        errorText: 'Неверный email',
        appearance: "secondary",
        size: "lg",
        borderRadius: 'none',
        id: 'input',
        htmlFor: 'input',
    },
    render: (args) => (
        <Input
            error={args.error}
            appearance={args.appearance}
            borderRadius={args.borderRadius}
            size={args.size}
            icon={<SearchIcon/>}
            errorId="error-id"
        >
            <Input.Label htmlFor={args.htmlFor}>{args.label}</Input.Label>
            <Input.Field id={args.id} placeholder={args.placeholder}/>
            <Input.Error>{args.errorText}</Input.Error>
        </Input>
    ),
};

