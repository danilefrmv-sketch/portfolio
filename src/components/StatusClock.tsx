import { useEffect, useState } from 'react';

const NOVOSIBIRSK_OFFSET_MINUTES = 7 * 60;

function formatNovosibirskTime(date: Date): string {
  const utcMinutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  const localMinutes = (utcMinutes + NOVOSIBIRSK_OFFSET_MINUTES + 24 * 60) % (24 * 60);
  const hours = Math.floor(localMinutes / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (localMinutes % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

interface StatusClockProps {
  available?: boolean;
  availableLabel: string;
  busyLabel: string;
}

export default function StatusClock({ available = true, availableLabel, busyLabel }: StatusClockProps) {
  const [time, setTime] = useState(() => formatNovosibirskTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatNovosibirskTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-panel inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs">
      <span className="relative flex h-2 w-2">
        {available && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${available ? 'bg-emerald-400' : 'bg-fg-muted'}`} />
      </span>
      <span className="font-medium text-fg-muted">{available ? availableLabel : busyLabel}</span>
      <span className="h-3 w-px bg-border" />
      <span className="font-medium text-fg-muted">
        <span className="hidden md:inline">Новосибирск, {time} (+7 UTC)</span>
        <span className="md:hidden">+7 UTC</span>
      </span>
    </div>
  );
}
