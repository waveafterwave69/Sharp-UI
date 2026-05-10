import type { FC, ReactNode, HTMLAttributes } from 'react'
import styles from './Card.module.css'
import { classNames } from '../../helpers/helpers'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    appearance: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Card: FC<CardProps> = ({
    children,
    className = '',
    appearance = 'primary',
    size = 'md',
    borderRadius = 'none',
    ...props
}) => {
    return (
        <div
            className={classNames(
                styles.card,
                {
                    [styles[`card__${appearance}`]]: true,
                    [styles[`card__${size}`]]: true,
                    [styles[`card__border-${borderRadius}`]]: true,
                },
                [className],
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export default Card
