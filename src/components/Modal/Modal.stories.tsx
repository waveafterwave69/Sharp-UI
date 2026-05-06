import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Modal from './Modal'
import Button from '../Button/Button'

const meta: Meta<typeof Modal> = {
    title: 'Компоненты/Modal',
    component: Modal,
    tags: ['autodocs'],
    // Настраиваем элементы управления (Controls)
    argTypes: {
        appearance: {
            control: 'select',
            options: ['primary', 'secondary'],
            description: 'Цветовая схема модального окна',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Размер окна',
        },
        borderRadius: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Радиус скругления углов',
        },
    },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Interactive: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Открыть модалку</Button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <h3 style={{ fontSize: '24px' }}>Заголовок модалки</h3>
                        <p>Контент Контент Контент Контент Контент.</p>
                        <p>Контент Контент Контент Контент Контент.</p>
                        <p>Контент Контент Контент Контент Контент.</p>
                        <Button
                            appearance="secondary"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        >
                            Какая то кнопка
                        </Button>
                    </div>
                </Modal>
            </>
        )
    },
    args: {
        appearance: 'primary',
        size: 'md',
        borderRadius: 'md',
    },
}
