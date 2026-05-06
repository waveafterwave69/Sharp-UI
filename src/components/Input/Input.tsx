import {createContext, type FC, useContext} from 'react';
import styles from './Input.module.css';
import {classNames} from '../../helpers/helpers.ts';

interface InputProps {
    children: React.ReactNode;
    error: boolean;
    className?: string;
    appearance?: 'primary' | 'secondary';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    errorId: string;
}

type InputComponent = FC<InputProps> & {
    Label: FC<LabelProps>;
    Field: FC<FieldProps>;
    Error: FC<ErrorProps>;
};

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputSize?: InputProps['size'];
    appearance?: InputProps['appearance'];
    borderRadius?: InputProps['borderRadius'];
}

interface LabelProps extends React.InputHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode
    className?: string;
    labelSize?: InputProps['size'];
    appearance?: InputProps['appearance'];
}

interface ErrorProps {
    children: React.ReactNode;
    className?: string;
    ErrorSize?: InputProps['size'];
    appearance?: InputProps['appearance'];
}

const InputContext = createContext<{
    error?: boolean,
    errorId?: InputProps['errorId']
    size?: InputProps['size'];
    appearance?: InputProps['appearance'];
    borderRadius?: InputProps['borderRadius'];
}>({});

export const Input: InputComponent = ({ children, error, size, appearance, borderRadius, errorId }) => {

    return (
        <InputContext.Provider value={{ error, size, appearance, borderRadius, errorId }}>
            <div className={styles.root}>{ children }</div>
        </InputContext.Provider>
    )
}

const Label = ({
    children,
    className='',
    labelSize,
    appearance,
    ...rest
}:LabelProps) => {
    const ctx = useContext(InputContext);

    const SIZE = labelSize ?? ctx.size ?? 'md';
    const APPEARANCE = appearance ?? ctx.appearance ?? 'primary';

    return (
        <label
            aria-invalid={ctx.error || undefined}
            className={classNames(styles.label,
                {},
                [
                    className,
                    styles[`label__${SIZE}`],
                    styles[`label__${APPEARANCE}`]
                ]
            )}
            {...rest}
        >
            {children}
        </label>
    )
}

const Field = ({
   appearance,
   inputSize,
   borderRadius,
   className='',
   ...rest
}: FieldProps) => {
    const ctx = useContext(InputContext);

    const SIZE = inputSize ?? ctx.size ?? 'md';
    const APPEARANCE = appearance ?? ctx.appearance ?? 'primary';
    const BORDER_RADIUS = borderRadius ?? ctx.borderRadius ?? 'none';

    return (
        <input
            aria-describedby={ctx.error ? ctx.errorId : undefined}
            className={classNames(styles.field,
                {},
                [
                    className,
                    styles[`field__${APPEARANCE}`],
                    styles[`field__${SIZE}`],
                    styles[`field__border-${BORDER_RADIUS}`]
                ]
            )} {...rest}
        />
    )
};

const Error: FC<ErrorProps> = ({
    children,
    className='',
    ErrorSize,
    appearance
}) => {
    const ctx = useContext(InputContext);

    if (!ctx.error) return null;

    const SIZE = ErrorSize ?? ctx.size ?? 'md';
    const APPEARANCE = appearance ?? ctx.appearance ?? 'primary';

    return (
        <span
            id={ctx.errorId ?? ''}
            className={classNames(styles.error,
                {},
                [
                    className,
                    styles[`error__${APPEARANCE}`],
                    styles[`error__${SIZE}`]
                ]
            )}
        >
            {children}
        </span>
    )
};

Input.Label = Label;
Input.Field = Field;
Input.Error = Error;