import type { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'
import { classNames } from '../../helpers/helpers'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    children?: ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
}

const Button: FC<ButtonProps> = ({
    appearance = 'primary',
    size = 'md',
    children,
    className = '',
    disabled = false,
    onClick,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={classNames(
                styles.button,
                {
                    [styles[`button__${appearance}`]]: true,
                    [styles[`button__${size}`]]: true,
                },
                [className],
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
