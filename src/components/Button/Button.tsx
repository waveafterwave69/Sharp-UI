import type { FC, ReactNode } from 'react'
import styles from './Button.module.css'
import { classNames } from '../../helpers/helpers'

interface ButtonProps {
    appearance?: 'primary' | 'secondary'
    size?: 's' | 'm' | 'l' | 'xl'
    children?: ReactNode
    className: string
}

const Button: FC<ButtonProps> = ({
    appearance = 'primary',
    size = 'm',
    children,
    className = '',
    ...props
}) => {
    return (
        <button
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
