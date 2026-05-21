import { useEffect, useMemo, useRef, useState } from 'react'
import type { FC, HTMLAttributes } from 'react'
import { classNames } from '../../helpers/helpers.ts'
import styles from './DatePicker.module.css'

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export interface DatePickerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value: Date | null
    onChange: (value: Date | null) => void
    label?: string
    placeholder?: string
    appearance?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    disabled?: boolean
    error?: string | null
    errorId?: string
    minDate?: Date
    maxDate?: Date
}

const startOfDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate())

const startOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1)

const isSameDay = (left: Date, right: Date) =>
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()

const isDateDisabled = (date: Date, minDate?: Date, maxDate?: Date) => {
    const time = startOfDay(date).getTime()

    if (minDate && time < startOfDay(minDate).getTime()) return true
    if (maxDate && time > startOfDay(maxDate).getTime()) return true

    return false
}

const getCalendarDays = (month: Date) => {
    const firstDay = startOfMonth(month)
    const firstWeekDay = (firstDay.getDay() + 6) % 7
    const daysInMonth = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth() + 1,
        0,
    ).getDate()
    const daysCount = Math.ceil((firstWeekDay + daysInMonth) / 7) * 7

    return Array.from({ length: daysCount }, (_, index) => {
        return new Date(
            firstDay.getFullYear(),
            firstDay.getMonth(),
            index - firstWeekDay + 1,
        )
    })
}

const formatDate = (date: Date) =>
    date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

const DatePicker: FC<DatePickerProps> = ({
    value,
    onChange,
    label,
    placeholder = 'Выберите дату',
    appearance = 'primary',
    size = 'md',
    borderRadius = 'none',
    disabled = false,
    error = null,
    errorId = 'datepicker-error',
    minDate,
    maxDate,
    className = '',
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [visibleMonth, setVisibleMonth] = useState(() =>
        startOfMonth(value ?? new Date()),
    )
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    const calendarDays = useMemo(
        () => getCalendarDays(visibleMonth),
        [visibleMonth],
    )

    const selectedDate = value ? startOfDay(value) : null
    const today = startOfDay(new Date())
    const selectedLabel = value ? formatDate(value) : placeholder
    const monthLabel = visibleMonth.toLocaleDateString('ru-RU', {
        month: 'long',
        year: 'numeric',
    })

    const handleOpen = () => {
        if (disabled) return

        if (!isOpen && value) {
            setVisibleMonth(startOfMonth(value))
        }

        setIsOpen((prev) => !prev)
    }

    const handleMonthChange = (offset: number) => {
        setVisibleMonth(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1),
        )
    }

    const handleSelect = (date: Date) => {
        if (isDateDisabled(date, minDate, maxDate)) return

        const nextValue = startOfDay(date)
        onChange(nextValue)
        setVisibleMonth(startOfMonth(nextValue))
        setIsOpen(false)
    }

    return (
        <div
            className={classNames(styles.root, {}, [className])}
            ref={rootRef}
            {...props}
        >
            {label && (
                <label
                    className={classNames(
                        styles.label,
                        {
                            [styles.label_disabled]: disabled,
                            [styles.label_error]: Boolean(error),
                        },
                        [
                            styles[`label_${appearance}`],
                            styles[`label_size_${size}`],
                        ],
                    )}
                >
                    {label}
                </label>
            )}

            <button
                type="button"
                className={classNames(
                    styles.trigger,
                    {
                        [styles.trigger_error]: Boolean(error),
                    },
                    [
                        styles[`trigger_${appearance}`],
                        styles[`trigger_size_${size}`],
                        styles[`trigger_border_${borderRadius}`],
                    ],
                )}
                disabled={disabled}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                onClick={handleOpen}
            >
                <span
                    className={classNames(
                        styles.value,
                        { [styles.value_placeholder]: !value },
                        [],
                    )}
                >
                    {selectedLabel}
                </span>
                <span className={styles.icon} aria-hidden="true">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 2V5M17 2V5M4 9H20M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <div
                    className={classNames(
                        styles.calendar,
                        {},
                        [
                            styles[`calendar_${appearance}`],
                            styles[`calendar_size_${size}`],
                            styles[`calendar_border_${borderRadius}`],
                        ],
                    )}
                    role="dialog"
                >
                    <div className={styles.header}>
                        <button
                            type="button"
                            className={styles.navButton}
                            onClick={() => handleMonthChange(-1)}
                            aria-label="Предыдущий месяц"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 18L9 12L15 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <span className={styles.month}>{monthLabel}</span>
                        <button
                            type="button"
                            className={styles.navButton}
                            onClick={() => handleMonthChange(1)}
                            aria-label="Следующий месяц"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 18L15 12L9 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className={styles.weekDays}>
                        {WEEK_DAYS.map((day) => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>

                    <div className={styles.days}>
                        {calendarDays.map((day) => {
                            const isOutside =
                                day.getMonth() !== visibleMonth.getMonth()
                            const isSelected =
                                selectedDate && isSameDay(day, selectedDate)
                            const isToday = isSameDay(day, today)
                            const dayDisabled = isDateDisabled(
                                day,
                                minDate,
                                maxDate,
                            )

                            return (
                                <button
                                    type="button"
                                    key={day.getTime()}
                                    className={classNames(
                                        styles.day,
                                        {
                                            [styles.day_outside]: isOutside,
                                            [styles.day_selected]:
                                                Boolean(isSelected),
                                            [styles.day_today]: isToday,
                                        },
                                        [],
                                    )}
                                    disabled={dayDisabled}
                                    aria-selected={Boolean(isSelected)}
                                    onClick={() => handleSelect(day)}
                                >
                                    {day.getDate()}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {error && (
                <span
                    className={classNames(styles.error, {}, [
                        styles[`error_size_${size}`],
                    ])}
                    id={errorId}
                >
                    {error}
                </span>
            )}
        </div>
    )
}

export default DatePicker
