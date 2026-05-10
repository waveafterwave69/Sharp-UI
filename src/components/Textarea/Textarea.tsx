import {
    createContext,
    type FC,
    type ReactNode,
    useContext,
    useRef,
    useEffect,
} from 'react'
import styles from './Textarea.module.css'
import { classNames } from '../../helpers/helpers.ts'

interface TextareaProps {
    children: ReactNode
    className?: string
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    error: boolean
    errorId: string
    icon?: ReactNode
}

interface FieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    inputSize?: TextareaProps['size']
    appearance?: TextareaProps['appearance']
    borderRadius?: TextareaProps['borderRadius']
    maxHeight?: number | string
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    labelSize?: TextareaProps['size']
    appearance?: TextareaProps['appearance']
}

interface ErrorProps {
    children: ReactNode
    className?: string
    ErrorSize?: TextareaProps['size']
    appearance?: TextareaProps['appearance']
}

const InputContext = createContext<{
    error?: boolean
    errorId?: string
    size?: TextareaProps['size']
    appearance?: TextareaProps['appearance']
    borderRadius?: TextareaProps['borderRadius']
    icon?: TextareaProps['icon']
}>({})

export const Textarea: FC<TextareaProps> & {
    Label: FC<LabelProps>
    Field: FC<FieldProps>
    Error: FC<ErrorProps>
} = ({
    children,
    error,
    size = 'md',
    appearance = 'primary',
    borderRadius = 'none',
    icon,
    errorId,
}) => {
    return (
        <InputContext.Provider
            value={{ error, size, appearance, borderRadius, errorId, icon }}
        >
            <div className={styles.root}>{children}</div>
        </InputContext.Provider>
    )
}

const Label: FC<LabelProps> = ({
    children,
    className = '',
    labelSize,
    appearance,
    ...props
}) => {
    const ctx = useContext(InputContext)
    const SIZE = labelSize ?? ctx.size ?? 'md'
    const APPEARANCE = appearance ?? ctx.appearance ?? 'primary'

    return (
        <label
            className={classNames(styles.label, {}, [
                className,
                styles[`label__${SIZE}`],
                styles[`label__${APPEARANCE}`],
            ])}
            {...props}
        >
            {children}
        </label>
    )
}

const Field: FC<FieldProps> = ({
    appearance,
    inputSize,
    borderRadius,
    className = '',
    maxHeight,
    onChange,
    ...props
}) => {
    const ctx = useContext(InputContext)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const SIZE = inputSize ?? ctx.size ?? 'md'
    const APPEARANCE = appearance ?? ctx.appearance ?? 'primary'
    const BORDER_RADIUS = borderRadius ?? ctx.borderRadius ?? 'none'

    const adjustHeight = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }

    useEffect(() => {
        adjustHeight()
    }, [props.value, props.defaultValue])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight()
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <div className={styles.field_container}>
            {ctx.icon && <span className={styles.icon}>{ctx.icon}</span>}
            <textarea
                ref={textareaRef}
                aria-describedby={ctx.error ? ctx.errorId : undefined}
                onChange={handleChange} // Меняем на onChange
                style={{ maxHeight }}
                className={classNames(
                    styles.field,
                    {
                        [styles.field__withLeftIcon]: !!ctx.icon,
                        [styles.field__error]: !!ctx.error,
                    },
                    [
                        className,
                        styles[`field__${APPEARANCE}`],
                        styles[`field__${SIZE}`],
                        styles[`field__border-${BORDER_RADIUS}`],
                        styles[`scrollbar__border-${BORDER_RADIUS}`],
                    ],
                )}
                {...props}
            />
        </div>
    )
}

const Error: FC<ErrorProps> = ({
    children,
    className = '',
    ErrorSize,
    appearance,
}) => {
    const ctx = useContext(InputContext)
    if (!ctx.error) return null

    const SIZE = ErrorSize ?? ctx.size ?? 'md'
    const APPEARANCE = appearance ?? ctx.appearance ?? 'primary'

    return (
        <span
            id={ctx.errorId}
            className={classNames(styles.error, {}, [
                className,
                styles[`error__${APPEARANCE}`],
                styles[`error__${SIZE}`],
            ])}
        >
            {children}
        </span>
    )
}

Textarea.Label = Label
Textarea.Field = Field
Textarea.Error = Error
