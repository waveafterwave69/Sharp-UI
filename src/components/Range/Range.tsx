import { type FC, type ChangeEvent, useState, useEffect } from 'react'
import styles from './Range.module.css'
import { classNames } from '../../helpers/helpers'

export interface RangeValue {
    min: number
    max: number
}

export interface RangeProps {
    min?: number
    max?: number
    step?: number
    value?: RangeValue
    onChange?: (value: RangeValue) => void
    disabled?: boolean
    className?: string
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Range: FC<RangeProps> = ({
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    disabled = false,
    className = '',
    appearance = 'primary',
    size = 'md',
}) => {
    const [rangeValue, setRangeValue] = useState<RangeValue>(
        value ?? { min, max },
    )

    useEffect(() => {
        if (value) {
            setRangeValue(value)
        }
    }, [value])

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), rangeValue.max - step)
        const updated = { ...rangeValue, min: newMin }
        setRangeValue(updated)
        onChange?.(updated)
    }

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), rangeValue.min + step)
        const updated = { ...rangeValue, max: newMax }
        setRangeValue(updated)
        onChange?.(updated)
    }

    const minPercent = ((rangeValue.min - min) / (max - min)) * 100
    const maxPercent = ((rangeValue.max - min) / (max - min)) * 100

    return (
        <div
            className={classNames(
                styles['range__container'],
                {
                    [styles['range__container--disabled']]: disabled,
                    [styles[`range__${appearance}`]]: true,
                    [styles[`range__${size}`]]: true,
                },
                [className],
            )}
        >
            <div className={styles['range__slider']}>
                <div
                    className={classNames(styles['range__tooltip'], {}, [
                        styles['range__tooltip--min'],
                    ])}
                    style={{
                        left: `calc(${minPercent}% + (var(--range-thumb-size) / 2) - (${minPercent} * var(--range-thumb-size) / 100))`,
                    }}
                >
                    {rangeValue.min}
                </div>

                <div
                    className={classNames(styles['range__tooltip'], {}, [
                        styles['range__tooltip--max'],
                    ])}
                    style={{
                        left: `calc(${maxPercent}% + (var(--range-thumb-size) / 2) - (${maxPercent} * var(--range-thumb-size) / 100))`,
                    }}
                >
                    {rangeValue.max}
                </div>

                <div
                    className={styles['range__track']}
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                    }}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={rangeValue.min}
                    onChange={handleMinChange}
                    disabled={disabled}
                    className={classNames(styles['range__input'], {}, [
                        styles['range__input--min'],
                    ])}
                    style={{
                        zIndex:
                            rangeValue.min > max - (max - min) / 2
                                ? 5
                                : undefined,
                    }}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={rangeValue.max}
                    onChange={handleMaxChange}
                    disabled={disabled}
                    className={classNames(styles['range__input'], {}, [
                        styles['range__input--max'],
                    ])}
                />
            </div>
        </div>
    )
}

export default Range
