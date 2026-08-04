export interface ExperienceItem {
  company: string;
  location?: string;
  period: string;
  current: boolean;
  role: string;
  description: string;
  directions: string[];
  skills: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Энтерсайт',
    location: 'entersight.ru',
    period: 'июнь 2021 — настоящее время',
    current: true,
    role: 'UX/UI-дизайнер',
    description:
      'Проектировал с нуля облачную B2B SaaS товароучётную систему для автоматизации продуктового ритейла. Участвовал в формировании продукта от этапа MVP до развития функциональности: пользовательские сценарии, ключевые модули, веб- и мобильные интерфейсы, дизайн-система. Дополнительно — сайт продукта, презентации, маркетинговые материалы.',
    directions: ['Веб', 'Мобайл', 'Дизайн-система'],
    skills: ['UX Research', 'User Flow', 'Libraries', 'Variables', 'Components & Variants', 'Auto Layout']
  },
  {
    company: 'Bars',
    location: 'Екатеринбург',
    period: 'август 2025 — июнь 2026',
    current: false,
    role: 'UX/UI-дизайнер',
    description:
      'Редизайн и проектирование новых цифровых продуктов для компании-автоматизатора аквапарков, горнолыжных курортов и термальных комплексов: веб-сервисы (конфигураторы, клиентские экраны), мобильные приложения, киоски самообслуживания, POS-интерфейсы, дизайн-система.',
    directions: ['Веб', 'Мобайл', 'Киоски', 'POS'],
    skills: ['UX Audit', 'UX optimization', 'Prototyping', 'Component Libraries', 'Variables', 'Components & Variants', 'Auto Layout']
  },
  {
    company: 'DK Mark',
    location: 'Москва',
    period: 'декабрь 2025 — апрель 2026',
    current: false,
    role: 'UX/UI-дизайнер',
    description:
      'Участвовал в создании с нуля MES-платформы для автоматизации производственной маркировки: веб-платформа, планшетные интерфейсы, мобильное приложение для ТСД.',
    directions: ['Веб', 'Планшет', 'Мобайл'],
    skills: ['Adaptive & Responsive Design', 'Auto Layout']
  },
  {
    company: 'Fora',
    location: 'Новосибирск, fora.sg',
    period: 'август 2025 — апрель 2026',
    current: false,
    role: 'UX/UI-дизайнер',
    description:
      'Проектирование цифровых решений для спортивных объектов: веб-сервисы, интерфейсы медиасистем, спортивные табло.',
    directions: ['Веб', 'Медиасистемы'],
    skills: []
  },
  {
    company: 'ДатаКрат',
    period: 'январь 2020 — август 2024',
    current: false,
    role: 'UX/UI дизайнер',
    description:
      'Проектирование B2B-продуктов для автоматизации ритейла и сервисного бизнеса: веб и мобильные интерфейсы для ERP-системы, веб и мобильные интерфейсы для Сервис-деск, мобильное приложение для Пятёрочка, киоск самообслуживания для Лента.',
    directions: ['Веб', 'Мобайл', 'Киоски'],
    skills: []
  },
  {
    company: 'Positive Technologies',
    period: 'июнь 2023 — август 2023',
    current: false,
    role: 'Дизайнер',
    description: 'Проектно выполнял дизайн лендингов для мероприятий.',
    directions: ['Веб'],
    skills: []
  }
];
