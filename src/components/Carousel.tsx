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

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 32 };

export default function Carousel({ images, alt }: CarouselProps) {
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0]);
  const reduceMotion = useReducedMotion();

  const goTo = (nextIndex: number, dir: number) => {
    const wrapped = (nextIndex + images.length) % images.length;
    setIndexState([wrapped, dir]);
  };

  if (images.length === 0) return null;
  const current = images[index];

  return (
    <div className="glass-panel relative mx-auto max-w-4xl overflow-hidden rounded-[24px]">
      <div className="relative aspect-[4/3] w-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={current.src}
            width={current.width}
            height={current.height}
            alt={`${alt} — изображение ${index + 1} из ${images.length}`}
            custom={direction}
            initial={reduceMotion ? false : { x: direction >= 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { x: direction >= 0 ? '-100%' : '100%', opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : SPRING}
            className="absolute inset-0 h-full w-full object-contain bg-bg-elevated"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              data-cursor="link"
              aria-label="Предыдущее изображение"
              onClick={() => goTo(index - 1, -1)}
              className="glass-panel absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:text-accent"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              data-cursor="link"
              aria-label="Следующее изображение"
              onClick={() => goTo(index + 1, 1)}
              className="glass-panel absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:text-accent"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              data-cursor="link"
              aria-label={`Перейти к изображению ${i + 1}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-accent' : 'w-1.5 bg-fg-muted/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
