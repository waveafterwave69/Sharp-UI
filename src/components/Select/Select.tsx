import styles from './Select.module.css';
import {useEffect, useMemo, useRef, useState} from "react";
import {classNames} from "../../helpers/helpers.ts";

interface SelectOption<T> {
    label: string;
    value: T;
}

export interface SelectProps<T>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>  {
    label?: string;
    title?: string;
    options: SelectOption<T>[];
    value: T;
    onChange: (value: T) => void;
    appearance?: 'primary' | 'secondary';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    error?: string | null;
}

const ArrowIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};


export function Select<T>({
    label,
    title = 'Выберите из списка...',
    options,
    appearance = 'primary',
    size = 'md',
    borderRadius = 'none',
    value,
    onChange,
    disabled = false,
    error = null,
}: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(target) &&
                !dropdownRef.current?.contains(target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleOpen = () => {
        if (disabled) return;
        setIsOpen(prev => !prev)
    }

    const handleSelect = (v: T) => {
        onChange(v)
        setIsOpen(false)
    }

    const selectedValue = useMemo(() => {
        return options.find(item => item.value === value)?.label ?? title;
    }, [value, title, options]);

    return (
        <div className={styles.root} ref={wrapperRef}>
            {label && (
                <label
                    className={classNames(
                        styles.label,
                        {
                            [styles.label_disabled]: disabled,
                            [styles.label_error]: Boolean(error),
                        },
                        [styles[`label_${appearance}`]]
                    )}
                >
                    {label}
                </label>
            )}
            <div
                className={classNames(
                    styles.title_container,
                    {
                        [styles.disabled]: disabled,
                        [styles.title_container_error]: Boolean(error),
                        [styles.title_container_open]: isOpen,
                    },
                    [
                        styles[`title_container_${appearance}`],
                        styles[`title_container_size_${size}`],
                        styles[`title_container_border_${borderRadius}`]
                    ]
                )}
                role="button"
                aria-disabled={disabled}
                aria-invalid={Boolean(error)}
                onClick={handleOpen}
            >
                <span>{selectedValue}</span>
                <span className={styles.icon}><ArrowIcon/></span>
            </div>
            {isOpen &&
                <div
                    className={classNames(
                        styles.overlay,
                        {},
                        [
                            styles[`overlay_${appearance}`],
                            styles[`overlay_size_${size}`],
                            styles[`overlay_border_${borderRadius}`]
                        ]
                    )}
                    ref={dropdownRef}
                >
                    {options.map(item => (
                        <div
                            onClick={() => handleSelect(item.value)}
                            className={classNames(
                                styles.option,
                                {
                                    [styles.option_active]: item.value === value,
                                },
                                []
                            )}
                            key={item.label}
                        >
                        <span>
                            {item.label}
                        </span>
                        </div>
                    ))}
                </div>}
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}