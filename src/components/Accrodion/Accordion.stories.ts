import {Accordion} from "./Accrodion";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof Accordion> = {
    title: 'Компоненты/Accrodion',
    component: Accordion,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Accordion>

export const Playground: Story = {
    args: {
        title: '«Ы»',
        description: '«Ы» — 29-я буква русского алфавита, обозначающая гласный звук [ɨ], который служит для твердости предшествующего согласного. '
    }
}