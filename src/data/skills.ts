export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Инструменты',
    items: ['Figma', 'Libraries', 'Variables', 'Auto Layout', 'Components & Variants']
  },
  {
    title: 'Процесс',
    items: ['UX Research', 'Прототипирование', 'UX Audit', 'Дизайн интерфейсов', 'Design Systems']
  },
  {
    title: 'Дополнительно',
    items: ['AI generation', 'Английский — B1']
  }
];
