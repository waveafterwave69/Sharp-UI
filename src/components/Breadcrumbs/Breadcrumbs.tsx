import type { FC, ReactNode } from 'react'
import styles from './Breadcrumbs.module.css'
import { classNames } from '../../helpers/helpers'
import React from 'react'

interface BreadcrumbsProps {
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    children?: ReactNode
    className?: string
    separator?: string
    activeColor?: string
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
    appearance = 'primary',
    size = 'md',
    children,
    className = '',
    separator = '/',
    activeColor,
    ...props
}) => {
    return (
        <nav aria-label="breadcrumb">
            <ol
                className={classNames(
                    styles.breadcrumb,
                    {
                        [styles[`breadcrumb__${appearance}`]]: true,
                        [styles[`breadcrumb__${size}`]]: true,
                    },
                    [className],
                )}
                style={
                    {
                        '--active-link-color': activeColor,
                    } as React.CSSProperties
                }
                {...props}
            >
                {React.Children.map(children, (child, index) => (
                    <li key={index}>
                        {child}
                        {index < React.Children.count(children) - 1 && (
                            <span aria-hidden="true">{separator}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
