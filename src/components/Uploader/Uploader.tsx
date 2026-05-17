import {
    type FC,
    type DragEvent,
    type ChangeEvent,
    type KeyboardEvent,
    type ComponentPropsWithRef,
    useState,
    useRef,
} from 'react'
import styles from './Uploader.module.css'
import { classNames } from '../../helpers/helpers'

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface UploaderProps extends Omit<
    ComponentPropsWithRef<'input'>,
    'size' | 'multiple' | 'accept'
> {
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    text?: string
    title?: string
    className?: string
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    selectedFiles: File[]
    onFilesSelect: (files: File[]) => void
    multiple?: boolean
    accept?: string
    maxFiles?: number
    maxFileSize?: number
    onValidationError?: (
        errorType: 'maxFiles' | 'maxFileSize' | 'accept',
        file?: File,
    ) => void
}

const Uploader: FC<UploaderProps> = ({
    appearance = 'primary',
    size = 'md',
    text = '',
    title = '',
    className = '',
    borderRadius = 'none',
    selectedFiles = [],
    onFilesSelect,
    multiple = false,
    accept,
    maxFiles,
    maxFileSize,
    onValidationError,
    ...props
}) => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Проверяем, достигнут ли лимит, либо заблокирован ли компонент извне
    const isLimitReached =
        maxFiles !== undefined && selectedFiles.length >= maxFiles
    const isDisabled = props.disabled || isLimitReached

    const handleZoneClick = () => {
        if (isDisabled) return
        fileInputRef.current?.click()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled) return
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleZoneClick()
        }
    }

    const validateAccept = (file: File): boolean => {
        if (!accept) return true

        const acceptTypes = accept.split(',').map((type) => type.trim())
        const fileName = file.name.toLowerCase()
        const fileType = file.type.toLowerCase()

        return acceptTypes.some((type) => {
            if (type.startsWith('.')) {
                return fileName.endsWith(type.toLowerCase())
            }
            if (type.endsWith('/*')) {
                const baseType = type.replace('/*', '')
                return fileType.startsWith(baseType)
            }
            return fileType === type
        })
    }

    const processFiles = (newFiles: File[]) => {
        if (isDisabled) return

        let filesToProcess = multiple ? newFiles : [newFiles[0]]

        if (accept) {
            const validTypes = filesToProcess.filter(validateAccept)
            if (validTypes.length !== filesToProcess.length) {
                const invalidFile = filesToProcess.find(
                    (f) => !validateAccept(f),
                )
                onValidationError?.('accept', invalidFile)
                return
            }
        }

        if (maxFileSize) {
            const oversizedFile = filesToProcess.find(
                (file) => file.size > maxFileSize,
            )
            if (oversizedFile) {
                onValidationError?.('maxFileSize', oversizedFile)
                return
            }
        }

        const currentList = multiple ? selectedFiles : []
        const updated = [...currentList, ...filesToProcess].filter(
            (file, index, self) =>
                self.findIndex(
                    (f) => f.name === file.name && f.size === file.size,
                ) === index,
        )

        if (maxFiles && updated.length > maxFiles) {
            onValidationError?.('maxFiles')
            return
        }

        onFilesSelect(updated)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(Array.from(e.target.files))
        }

        e.target.value = ''
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (isDisabled) return
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        if (isDisabled) return
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(Array.from(e.dataTransfer.files))
        }
    }

    const handleRemoveFile = (indexToRemove: number) => {
        const updated = selectedFiles.filter((_, idx) => idx !== indexToRemove)
        onFilesSelect(updated)
    }

    const handleClearAll = () => {
        onFilesSelect([])
    }

    const hasFiles = selectedFiles.length > 0

    return (
        <div className={classNames(styles.uploader, {}, [className])}>
            <div
                className={classNames(styles.uploader__zone, {
                    [styles[`uploader__${appearance}`]]: true,
                    [styles[`uploader__${size}`]]: true,
                    [styles[`uploader__border-${borderRadius}`]]: true,
                    [styles['uploader__zone--over']]: isDragOver && !isDisabled,
                    [styles['uploader__zone--disabled']]: isDisabled,
                })}
                onClick={handleZoneClick}
                onKeyDown={handleKeyDown}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDragEnd={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={isDisabled ? -1 : 0}
                aria-label="Загрузить файлы"
                aria-disabled={isDisabled}
            >
                <div className={styles.uploader__content}>
                    <h2 className={styles.uploader__title}>
                        {title || 'UPLOADER TITLE'}
                    </h2>
                    {text && <p className={styles.uploader__text}>{text}</p>}
                </div>

                <input
                    {...props}
                    type="file"
                    ref={fileInputRef}
                    className={styles.uploader__input}
                    onChange={handleFileChange}
                    multiple={multiple}
                    accept={accept}
                    disabled={isDisabled}
                    hidden
                />
            </div>

            {hasFiles && (
                <div
                    className={classNames(styles.uploader__filesWindow, {
                        [styles[`uploader__window__${appearance}`]]: true,
                        [styles[`uploader__window--${size}`]]: true,
                        [styles[`uploader__window-border-${borderRadius}`]]:
                            true,
                    })}
                >
                    <div className={styles.uploader__windowHeader}>
                        <span className={styles.uploader__windowCount}>
                            Файлов выбрано: {selectedFiles.length}
                        </span>
                        <button
                            type="button"
                            className={styles.uploader__clearAllBtn}
                            onClick={handleClearAll}
                        >
                            Очистить все
                        </button>
                    </div>

                    <div className={styles.uploader__list}>
                        {selectedFiles.map((file, idx) => (
                            <div
                                key={`${file.name}-${idx}`}
                                className={styles.uploader__item}
                            >
                                <svg
                                    className={styles.uploader__icon}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                                <div className={styles.uploader__fileDetails}>
                                    <span className={styles.uploader__fileName}>
                                        {file.name}
                                    </span>
                                    <span className={styles.uploader__fileSize}>
                                        {formatFileSize(file.size)}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className={styles.uploader__clearBtn}
                                    onClick={() => handleRemoveFile(idx)}
                                    aria-label={`Удалить ${file.name}`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Uploader
