import {
    type FC,
    type ChangeEvent,
    type KeyboardEvent,
    type DragEvent,
    useState,
    useRef,
    useEffect,
} from 'react'
import styles from './Uploader.module.css'
import { classNames } from '../../helpers/helpers'

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export type UploaderErrorType = 'accept' | 'maxFileSize' | 'maxFiles'

export interface UploaderProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size'
> {
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    text?: string
    title?: string
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    selectedFiles: File[]
    onFilesSelect: (files: File[]) => void
    maxFiles?: number
    maxFileSize?: number
    onValidationError?: (type: UploaderErrorType, file?: File) => void
}

interface ValidationResult {
    isValid: boolean
    type?: UploaderErrorType
    invalidFile?: File
}

const validateFiles = (
    filesToProcess: File[],
    currentFilesCount: number,
    options: {
        accept?: string
        maxFileSize?: number
        maxFiles?: number
        multiple: boolean
    },
): ValidationResult => {
    const { accept, maxFileSize, maxFiles, multiple } = options

    if (accept) {
        const acceptTypes = accept
            .split(',')
            .map((type) => type.trim().toLowerCase())

        const isTypeValid = (file: File) => {
            const fileName = file.name.toLowerCase()
            const fileType = file.type.toLowerCase()

            return acceptTypes.some((type) => {
                if (type.startsWith('.')) return fileName.endsWith(type)
                if (type.endsWith('/*'))
                    return fileType.startsWith(type.replace('/*', ''))
                return fileType === type
            })
        }

        const invalidFile = filesToProcess.find((file) => !isTypeValid(file))
        if (invalidFile) return { isValid: false, type: 'accept', invalidFile }
    }

    if (maxFileSize) {
        const oversizedFile = filesToProcess.find(
            (file) => file.size > maxFileSize,
        )
        if (oversizedFile)
            return {
                isValid: false,
                type: 'maxFileSize',
                invalidFile: oversizedFile,
            }
    }

    if (maxFiles) {
        const expectedCount = multiple
            ? currentFilesCount + filesToProcess.length
            : filesToProcess.length
        if (expectedCount > maxFiles) {
            return { isValid: false, type: 'maxFiles' }
        }
    }

    return { isValid: true }
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
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isLimitReached =
        maxFiles !== undefined && selectedFiles.length >= maxFiles
    const isDisabled = props.disabled || isLimitReached

    useEffect(() => {
        if (selectedFiles.length === 0) setError(null)
    }, [selectedFiles])

    const getErrorMessage = (type: UploaderErrorType, file?: File): string => {
        switch (type) {
            case 'accept':
                return `Неверный формат файла ${file ? `"${file.name}"` : ''}. Разрешены: ${accept}`
            case 'maxFileSize':
                return `Файл ${file ? `"${file.name}"` : ''} слишком большой. Макс. размер: ${formatFileSize(maxFileSize || 0)}`
            case 'maxFiles':
                return `Превышено максимальное количество файлов. Лимит: ${maxFiles}`
            default:
                return 'Ошибка при загрузке файла'
        }
    }

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

    const processFiles = (newFiles: File[]) => {
        if (isDisabled) return
        setError(null)

        const filesToProcess = multiple ? newFiles : [newFiles[0]]

        const validation = validateFiles(filesToProcess, selectedFiles.length, {
            accept,
            maxFileSize,
            maxFiles,
            multiple,
        })

        if (!validation.isValid && validation.type) {
            const errorMsg = getErrorMessage(
                validation.type,
                validation.invalidFile,
            )
            setError(errorMsg)
            onValidationError?.(validation.type, validation.invalidFile)
            return
        }

        const currentList = multiple ? selectedFiles : []
        const updated = [...currentList, ...filesToProcess].filter(
            (file, index, self) =>
                self.findIndex(
                    (f) => f.name === file.name && f.size === file.size,
                ) === index,
        )

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
                    [styles['uploader__zone--error']]: !!error,
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
                aria-invalid={!!error}
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

            {/* 4. Блок отображения внутренней ошибки */}
            {error && (
                <div className={styles.uploader__error}>
                    <span className={styles.uploader__errorIcon}>⚠️</span>
                    <span className={styles.uploader__errorText}>{error}</span>
                </div>
            )}

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
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemoveFile(idx)
                                    }}
                                    aria-label={`Удалить файл ${file.name}`}
                                >
                                    ✕
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
