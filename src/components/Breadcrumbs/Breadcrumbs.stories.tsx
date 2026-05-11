import type { Meta, StoryObj } from '@storybook/react'
import Breadcrumbs from './Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
    title: 'Компоненты/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    argTypes: {
        separator: { control: 'text' },
    },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
    args: {
        separator: '/',
        activeColor: '#2e40e2',
        children: [
            <a key="1" href="/">
                Главная
            </a>,
            <a key="2" href="/catalog">
                Каталог
            </a>,
            <span key="3">Смартфоны</span>,
        ],
    },
}
