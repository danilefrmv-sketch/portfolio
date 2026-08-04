import { useState } from 'react';

interface ProjectFilterProps {
  platforms: Array<{ value: string; label: string }>;
  allLabel: string;
}

export default function ProjectFilter({ platforms, allLabel }: ProjectFilterProps) {
  const [active, setActive] = useState<string>('all');

  const applyFilter = (value: string) => {
    setActive(value);
    const cards = document.querySelectorAll<HTMLElement>('[data-project-card]');
    cards.forEach((card) => {
      const cardPlatforms = card.dataset.platforms?.split(',') ?? [];
      const visible = value === 'all' || cardPlatforms.includes(value);
      card.style.display = visible ? '' : 'none';
    });
  };

  const options = [{ value: 'all', label: allLabel }, ...platforms];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          data-cursor="link"
          onClick={() => applyFilter(option.value)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            active === option.value ? 'bg-accent text-bg' : 'glass-panel text-fg-muted hover:text-fg'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
