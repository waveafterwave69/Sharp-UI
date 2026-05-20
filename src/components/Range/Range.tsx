import { type FC, type ChangeEvent } from 'react'
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
    value: RangeValue
    onChange: (value: RangeValue) => void
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
    const currentMin = value?.min ?? min
    const currentMax = value?.max ?? max

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), currentMax - step)
        onChange({ min: newMin, max: currentMax })
    }

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), currentMin + step)
        onChange({ min: currentMin, max: newMax })
    }

    const minPercent = ((currentMin - min) / (max - min)) * 100
    const maxPercent = ((currentMax - min) / (max - min)) * 100

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
                    {currentMin}
                </div>

                <div
                    className={classNames(styles['range__tooltip'], {}, [
                        styles['range__tooltip--max'],
                    ])}
                    style={{
                        left: `calc(${maxPercent}% + (var(--range-thumb-size) / 2) - (${maxPercent} * var(--range-thumb-size) / 100))`,
                    }}
                >
                    {currentMax}
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
                    value={currentMin}
                    onChange={handleMinChange}
                    disabled={disabled}
                    className={classNames(styles['range__input'], {}, [
                        styles['range__input--min'],
                    ])}
                    style={{
                        zIndex:
                            currentMin > max - (max - min) / 2 ? 5 : undefined,
                    }}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={currentMax}
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
