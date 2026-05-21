import React, {
    type FC,
    useMemo,
    useState,
    type KeyboardEvent, useRef, useEffect
} from "react";
import styles from "./Carousel.module.css";
import Arrow from "./assets/arrow.svg?react";
import { classNames } from "../../helpers/helpers.ts";

interface CarouselProps {
    children: React.ReactNode;
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Carousel: FC<CarouselProps> = ({
    children,
    borderRadius = 'none',
}) => {
    const media = useMemo(() => React.Children.toArray(children), [children]);

    const [activeMedia, setActiveMedia] = useState(0);
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const [widths, setWidths] = useState<number[]>([]);

    useEffect(() => {
        setWidths(refs.current.map((el) => el?.clientWidth ?? 0));
    }, [media]);

    const translateX = widths
        .slice(0, activeMedia)
        .reduce((sum, width) => sum + width, 0);

    const setNext = (e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();

        setActiveMedia((prev) => {
            const next = prev + 1;

            if(next >= media.length - 1) return media.length - 1;

            return next;
        });
    };

    const setPrev = (e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();

        setActiveMedia((prev) => {
            const next =  prev - 1;

            if(next <= 0) return 0;

            return next;
        });
    };

    return (
        <div
            className={styles.overlay}
        >
            <button
                type="button"
                onClick={setPrev}
                className={classNames(
                    styles.left_arrow,
                    {},
                    [
                        styles.icon,
                        styles[`icon__border__${borderRadius}`]
                    ]
                )}
                aria-label="Previous slide"
                disabled={activeMedia === 0}
            >
                <Arrow />
            </button>

            <div
                className={styles.media_viewport}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={styles.media_container}
                    style={{
                        transform: `translateX(-${translateX}px)`,
                    }}
                >
                    {media.map((m, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                refs.current[index] = el;
                            }}
                            className={styles.media}
                        >
                            {m}
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={setNext}
                className={classNames(
                    styles.right_arrow,
                    {},
                    [
                        styles.icon,
                        styles[`icon__border__${borderRadius}`]
                    ]
                )}
                aria-label="Next slide"
                disabled={activeMedia === media.length - 1}
            >
                <Arrow />
            </button>
        </div>
    );
};

export default Carousel;