import type { FC } from 'react'
import styles from './Loading.module.css'
import { classNames } from '../../helpers/helpers'

interface LoadingProps {
    appearance?: 'primary' | 'secondary'
    variant?: 'spinner' | 'dots' | 'pulse' | '3d'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

const Loading: FC<LoadingProps> = ({
    appearance = 'primary',
    variant = 'spinner',
    size = 'md',
    className = '',
    ...props
}) => {
    return (
        <div
            className={classNames(
                styles.loader,
                {
                    [styles[`loader__${appearance}`]]: true,
                    [styles[`loader__${size}`]]: true,
                    [styles[variant]]: true,
                },
                [className],
            )}
            {...props}
        />
    )
}

export default Loading
