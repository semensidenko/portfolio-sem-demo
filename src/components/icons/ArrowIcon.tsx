/**
 * Стрілка праворуч зі старого макета. Колір береться з тексту (`currentColor`),
 * розмір і поворот задаються класами ззовні (наприклад, `size-6 -rotate-45`).
 * Декоративна: `aria-hidden`.
 */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10.6548 20.0142L12.6992 22.0586L22.3965 12.3614L12.6992 2.6641L10.6548 4.70852L16.8618 10.9155H3.00196V13.8072H16.8618L10.6548 20.0142Z" />
    </svg>
  );
}
