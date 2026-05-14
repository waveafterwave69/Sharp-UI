import type {FC} from "react";
import {classNames} from "../../helpers/helpers.ts";
import styles from './Checkbox.module.css';

interface CheckboxProps {
    appearance?: 'primary' | 'secondary';
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    label?: string | null;
    error?: string | null;
    errorId?: string;
    disabled?: boolean;
    checked: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
    appearance = 'primary',
    size = 'md',
    borderRadius = 'none',
    className = '',
    label = null,
    error = null,
    errorId = 'error',
    disabled = false,
    checked,
    onChange
}) => {

    return (
        <div className={styles.container}>
            <label
                className={classNames(
                    styles.label,
                    {},
                    [
                        styles[`label__${appearance}`],
                        styles[`label__size__${size}`],
                    ]
                )}
            >
                <input
                    type='checkbox'
                    className={classNames(
                        styles.checkbox,
                        {},
                        [
                            styles[`checkbox__${appearance}`],
                            styles[`checkbox__size__${size}`],
                            styles[`checkbox__border__${borderRadius}`],
                            className
                        ]
                    )}
                    disabled={disabled}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                />
                {label && <span>{label}</span>}
            </label>
            {error &&
            <span
                className={classNames(
                    styles.error,
                    {},
                    [
                        styles[`error__${size}`]
                    ]
                )}
                id={errorId}
            >
                {error}
            </span>}
        </div>
    )
}

export default Checkbox;