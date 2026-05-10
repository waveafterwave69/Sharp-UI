import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from './Card'

const meta: Meta<typeof Card> = {
    title: 'Компоненты/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        appearance: {
            control: 'select',
            options: ['primary', 'secondary'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        borderRadius: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
        },
    },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
    args: {
        children: 'Простой контент карточки',
        appearance: 'primary',
        size: 'md',
    },
}

export const ProductCard: Story = {
    render: (args) => (
        <Card {...args}>
            <div style={{ padding: '20px', width: '350px' }}>
                <img
                    src="https://gagosian.com/media/images/quarterly/interview-fashion-and-art-rick-owens/vqh7Pr0UOhwL_600x600.jpg"
                    alt="Product"
                    style={{ width: '100%', borderRadius: '4px' }}
                />
                <h3 style={{ margin: '15px 0 10px' }}>рик овенс</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    реальный жесткий тру designer. реальный жесткий тру
                    designer. реальный жесткий тру designer. реальный жесткий
                    тру designer.
                </p>
                <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                    3 500 ₽
                </div>
            </div>
        </Card>
    ),
    args: {
        appearance: 'secondary',
        borderRadius: 'lg',
        size: 'md',
    },
}
