import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface CarouselImage {
  src: string;
  width: number;
  height: number;
}

interface CarouselProps {
  images: CarouselImage[];
  alt: string;
}

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 22, mass: 0.9 };

export default function Carousel({ images, alt }: CarouselProps) {
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0]);
  const reduceMotion = useReducedMotion();

  const goTo = (nextIndex: number, dir: number) => {
    const wrapped = (nextIndex + images.length) % images.length;
    setIndexState([wrapped, dir]);
  };

  if (images.length === 0) return null;
  const current = images[index];
  const hasMultiple = images.length > 1;

  return (
    <div className="flex max-w-4xl items-center gap-3 md:gap-5">
      {hasMultiple && (
        <button
          type="button"
          data-cursor="link"
          aria-label="Предыдущее изображение"
          onClick={() => goTo(index - 1, -1)}
          className="glass-panel flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:text-accent"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
      )}

      <motion.div
        layout
        transition={reduceMotion ? { duration: 0 } : SPRING}
        className="relative min-w-0 flex-1 overflow-hidden rounded-[24px]"
        style={{ aspectRatio: `${current.width} / ${current.height}` }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={current.src}
            width={current.width}
            height={current.height}
            alt={`${alt} — изображение ${index + 1} из ${images.length}`}
            custom={direction}
            initial={reduceMotion ? false : { x: direction >= 0 ? '70%' : '-70%', opacity: 0, scale: 0.92 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { x: direction >= 0 ? '-70%' : '70%', opacity: 0, scale: 0.92 }}
            transition={reduceMotion ? { duration: 0 } : SPRING}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {hasMultiple && (
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                data-cursor="link"
                aria-label={`Перейти к изображению ${i + 1}`}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={`h-1.5 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.4)] transition-all duration-300 ${
                  i === index ? 'w-6 bg-accent' : 'w-1.5 bg-fg/60'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {hasMultiple && (
        <button
          type="button"
          data-cursor="link"
          aria-label="Следующее изображение"
          onClick={() => goTo(index + 1, 1)}
          className="glass-panel flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:text-accent"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      )}
    </div>
  );
}
