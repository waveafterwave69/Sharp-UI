import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Modal from './Modal'
import Button from '../Button/Button'

const meta: Meta<typeof Modal> = {
    title: 'Компоненты/Modal',
    component: Modal,
    tags: ['autodocs'],
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
                            gap: '30px',
                        }}
                    >
                        <h3 style={{ fontSize: '20px' }}>
                            Заголовок модального окна
                        </h3>
                        <p style={{ fontSize: '18px' }}>
                            Контент модального окна.
                        </p>
                        <p style={{ fontSize: '18px' }}>
                            Контент модального окна.
                        </p>
                        <p style={{ fontSize: '18px' }}>
                            Контент модального окна.
                        </p>
                        <Button
                            appearance="secondary"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        >
                            Закрыть
                        </Button>
                    </div>
                </Modal>
            </>
        )
    },
    args: {
        appearance: 'primary',
        size: 'md',
    },
}
