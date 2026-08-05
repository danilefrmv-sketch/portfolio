import { useRef, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PileImage {
  src: string;
  width: number;
  height: number;
}

interface PhotoPileProps {
  images: PileImage[];
}

function seededRandom(seed: number) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export default function PhotoPile({ images }: PhotoPileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState(() => images.map((_, i) => i));

  const layout = useMemo(
    () =>
      images.map((_, i) => {
        const r1 = seededRandom(i * 17 + 1);
        const r2 = seededRandom(i * 17 + 2);
        const r3 = seededRandom(i * 17 + 3);
        return {
          left: `${4 + r1 * 78}%`,
          top: `${4 + r2 * 74}%`,
          rotate: (r3 - 0.5) * 28
        };
      }),
    [images]
  );

  const bringToFront = (i: number) => {
    setOrder((prev) => (prev[prev.length - 1] === i ? prev : [...prev.filter((x) => x !== i), i]));
  };

  return (
    <div ref={containerRef} className="relative h-[900px] w-full sm:h-[760px] md:h-[720px]">
      {images.map((image, i) => (
        <motion.img
          key={image.src}
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          draggable={false}
          drag
          dragConstraints={containerRef}
          dragElastic={0.15}
          dragMomentum={false}
          onPointerDown={() => bringToFront(i)}
          whileDrag={{ scale: 1.06, rotate: 0, cursor: 'grabbing' }}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          style={{
            position: 'absolute',
            left: layout[i].left,
            top: layout[i].top,
            zIndex: order.indexOf(i),
            rotate: layout[i].rotate
          }}
          className="h-auto w-28 cursor-grab select-none rounded-[47px] [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.45))] sm:w-36 md:w-44"
        />
      ))}
    </div>
  );
}
