import styles from './Accordion.module.css';
import {type FC, useState} from "react";
import {classNames} from "../../helpers/helpers.ts";

const PlusIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6 12H18M12 6V18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

interface AccrodionProps {
    title: string;
    description: React.ReactNode;
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Accordion: FC<AccrodionProps> = ({
    title,
    description,
    appearance = 'primary',
    size = 'md',
    borderRadius = 'none'
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={classNames(
                styles.container,
                {
                    [styles.open]: isOpen
                },
                [
                    styles[`accordion__${appearance}`],
                    styles[`accordion__size-${size}`],
                    styles[`accordion__border-${borderRadius}`]
                ]
            )}
            aria-expanded={isOpen}
        >
            <button
                className={styles.title_container}
                onClick={()=>setIsOpen(prev => !prev)}
            >
                <span aria-label={title}>{title}</span>
                <PlusIcon/>
            </button>
            <div
                className={classNames(
                    styles.content,
                    {
                        [styles.content_open]: isOpen
                    },
                    []
                )}
            >
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    )
}