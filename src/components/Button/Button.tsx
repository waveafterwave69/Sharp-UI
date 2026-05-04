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
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    imgLeft?: string
    imgRight?: string
}

const Button: FC<ButtonProps> = ({
    appearance = 'primary',
    size = 'md',
    children,
    className = '',
    disabled = false,
    onClick,
    borderRadius = 'none',
    imgLeft,
    imgRight,
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
                    [styles[`button__border-${borderRadius}`]]: true,
                },
                [className],
            )}
            {...props}
        >
            {imgLeft && (
                <img className={styles.button__img} src={imgLeft} alt="" />
            )}

            {children && <span>{children}</span>}

            {imgRight && (
                <img className={styles.button__img} src={imgRight} alt="" />
            )}
        </button>
    )
}

export default Button
