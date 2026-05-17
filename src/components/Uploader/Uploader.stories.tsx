import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Uploader from './Uploader'

const meta: Meta<typeof Uploader> = {
    title: 'Компоненты/Uploader',
    component: Uploader,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Uploader>

const UploaderWithState = (props: any) => {
    const [files, setFiles] = useState<File[]>([])

    return (
        <Uploader
            {...props}
            selectedFiles={files}
            onFilesSelect={(newFiles) => {
                setFiles(newFiles)
                if (props.onFilesSelect) props.onFilesSelect(newFiles)
            }}
        />
    )
}

export const Default: Story = {
    args: {
        title: 'Загрузите файл',
        text: 'Перетащите файл сюда или нажмите для выбора',
        multiple: false,
    },
    render: (args) => <UploaderWithState {...args} />,
}

export const MultipleWithLimit: Story = {
    args: {
        title: 'Загрузка документов',
        text: 'Можно загрузить до 3 файлов',
        multiple: true,
        maxFiles: 3,
        onValidationError: (type) => {
            if (type === 'maxFiles') {
                alert('Превышено максимальное количество файлов (макс. 3)!')
            }
        },
    },
    render: (args) => <UploaderWithState {...args} />,
}

export const ImageValidation: Story = {
    args: {
        title: 'Загрузка аватара',
        text: 'Допускаются только изображения (PNG, JPG) размером до 2 MB',
        accept: 'image/png, image/jpeg',
        maxFileSize: 2 * 1024 * 1024,
        onValidationError: (type, file) => {
            if (type === 'accept') {
                alert(
                    `Неверный формат: ${file?.name}. Разрешены только PNG/JPEG.`,
                )
            }
            if (type === 'maxFileSize') {
                alert(`Файл ${file?.name} слишком большой (макс. 2 MB).`)
            }
        },
    },
    render: (args) => <UploaderWithState {...args} />,
}
