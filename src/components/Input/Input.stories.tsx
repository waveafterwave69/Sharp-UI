import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'


type PlaygroundArgs = {
    label: string;
    placeholder: string;
    error: boolean;
    errorText: string;

    appearance: 'primary' | 'secondary';
    inputSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    borderRadius: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    // override
    labelSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    errorSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
        inputSize: "lg",
        borderRadius: 'none',
    },
    render: (args) => (
        <Input
            error={args.error}
            appearance={args.appearance}
            size={args.inputSize}
            borderRadius={args.borderRadius}
            errorId="error-id"
        >
            <Input.Label>{args.label}</Input.Label>
            <Input.Field placeholder={args.placeholder}/>
            <Input.Error>{args.errorText}</Input.Error>
        </Input>
    ),
};

