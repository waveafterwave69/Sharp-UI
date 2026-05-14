import  Checkbox from "./Checkbox.tsx";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof Checkbox> = {
    title: 'Компоненты/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
    args: {
        appearance: 'primary',
        size: 'md',
        borderRadius: 'none',
        error: 'Это поле обязательно',
        label: 'Прочитано'
    }
}