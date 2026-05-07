import {
    useEffect,
    useCallback,
    useState,
    type ReactNode,
    type FC,
    type MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'
import { classNames } from '../../helpers/helpers'

interface ModalProps {
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    children?: ReactNode
    className?: string
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    isOpen: boolean
    onClose: () => void
}

const Modal: FC<ModalProps> = ({
    appearance = 'primary',
    size = 'md',
    children,
    className = '',
    borderRadius = 'none',
    isOpen,
    onClose,
}) => {
    const [isMounted, setIsMounted] = useState(false)

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        },
        [onClose],
    )

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
            window.addEventListener('keydown', onKeyDown)
            document.body.style.overflow = 'hidden'
        } else {
            window.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen, onKeyDown])

    if (!isOpen && !isMounted) return null

    const handleOverlayClick = () => onClose()

    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    return createPortal(
        <div
            className={classNames(
                styles.modal,
                {
                    [styles.opened]: isOpen,
                    [styles[`modal__${appearance}`]]: true,
                    [styles[`modal__${size}`]]: true,
                    [styles[`modal__border-${borderRadius}`]]: true,
                },
                [className],
            )}
            onClick={handleOverlayClick}
            onAnimationEnd={() => !isOpen && setIsMounted(false)}
        >
            <div
                className={styles.content}
                onClick={handleContentClick}
                role="dialog"
                aria-modal="true"
            >
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Закрыть модальное окно"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {children}
            </div>
        </div>,
        document.body,
    )
}

export default Modal
