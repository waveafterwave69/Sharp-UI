import React, {
    type FC,
    useEffect,
    useMemo,
    useState,
    type KeyboardEvent,
} from "react";
import styles from "./Carousel.module.css";
import Arrow from "./assets/arrow.svg?react";
import { classNames } from "../../helpers/helpers.ts";
import { createPortal } from "react-dom";

interface CarouselProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    borderRadius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Carousel: FC<CarouselProps> = ({
    isOpen,
    onClose,
    children,
    borderRadius = 'none',
}) => {
    const media = useMemo(() => React.Children.toArray(children), [children]);
    const [activeMedia, setActiveMedia] = useState(0);

    const setNext = (e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();

        setActiveMedia((prev) =>
            prev + 1 >= media.length ? 0 : prev + 1
        );
    };

    const setPrev = (e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();

        setActiveMedia((prev) =>
            prev - 1 < 0 ? media.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                setNext();
            }

            if (e.key === "ArrowLeft") {
                setPrev();
            }

            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className={styles.overlay}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
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

            >
                <Arrow />
            </button>

            <div
                className={styles.media_container}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.media}>
                    {media[activeMedia]}
                </div>

                <div
                    className={classNames(
                        styles.pagination,
                        {},
                        [
                            styles[`pagination__border__${borderRadius}`]
                        ]
                    )}
                >
                    {activeMedia + 1} / {media.length}
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
            >
                <Arrow />
            </button>
        </div>,
        document.body
    );
};

export default Carousel;