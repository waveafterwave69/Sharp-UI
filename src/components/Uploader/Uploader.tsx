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

interface UploaderProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    text?: string
    title?: string
    className?: string
    onFilesSelect?: (files: File[]) => void
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Uploader: FC<UploaderProps> = ({
    appearance = 'primary',
    size = 'md',
    text = '',
    title = '',
    className = '',
    onFilesSelect,
    borderRadius = 'none',
    ...props
}) => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleZoneClick = () => {
        fileInputRef.current?.click()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleZoneClick()
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(Array.from(e.target.files))
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(Array.from(e.dataTransfer.files))
        }
    }

    const processFiles = (newFiles: File[]) => {
        setSelectedFiles((prev) => {
            const updated = [...prev, ...newFiles].filter(
                (file, index, self) =>
                    self.findIndex(
                        (f) => f.name === file.name && f.size === file.size,
                    ) === index,
            )
            if (onFilesSelect) onFilesSelect(updated)
            return updated
        })
    }

    const handleRemoveFile = (indexToRemove: number) => {
        setSelectedFiles((prev) => {
            const updated = prev.filter((_, idx) => idx !== indexToRemove)
            if (onFilesSelect) onFilesSelect(updated)

            if (updated.length === 0 && fileInputRef.current) {
                fileInputRef.current.value = ''
            }
            return updated
        })
    }

    const handleClearAll = () => {
        setSelectedFiles([])
        if (onFilesSelect) onFilesSelect([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const hasFiles = selectedFiles.length > 0

    return (
        <div className={classNames(styles.uploader, {}, [className])}>
            <div
                className={classNames(styles.uploader__zone, {
                    [styles[`uploader__${appearance}`]]: true,
                    [styles[`uploader__${size}`]]: true,
                    [styles[`uploader__border-${borderRadius}`]]: true,
                    [styles['uploader__zone--over']]: isDragOver,
                })}
                onClick={handleZoneClick}
                onKeyDown={handleKeyDown}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDragEnd={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label="Загрузить файлы"
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
                    multiple
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
                    {/* Шапка окошка с кнопкой очистки */}
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
                                        {(file.size / 1024).toFixed(1)} KB
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
