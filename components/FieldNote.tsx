import { cn } from '@/lib/utils';

type FieldNoteVariant = 'default' | 'warning' | 'tip' | 'proof';

const variantStyles: Record<FieldNoteVariant, string> = {
  default: 'border-amber-200 bg-amber-50 text-amber-900',
  warning: 'border-sky-200 bg-sky-50 text-sky-900',
  tip: 'border-amber-200 bg-amber-50 text-amber-900',
  proof: 'border-sky-200 bg-sky-50 text-sky-900'
};

export default function FieldNote({
  title,
  body,
  items,
  variant = 'default',
  className
}: {
  title?: string;
  body?: string;
  items?: string[];
  variant?: FieldNoteVariant;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border px-4 py-3 shadow-sm',
        'before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-2xl',
        'before:bg-gradient-to-b before:from-ink-900 before:to-accent-600',
        'motion-safe:rotate-[-1deg] motion-safe:transition motion-safe:hover:rotate-0',
        variantStyles[variant],
        className
      )}
    >
      {title ? <p className="text-sm font-semibold">{title}</p> : null}
      {body ? (
        <p className={cn('whitespace-pre-line text-sm', title ? 'mt-2' : '')}>
          {body}
        </p>
      ) : null}
      {items?.length ? (
        <ul className={cn('list-disc space-y-1 pl-4 text-sm', body || title ? 'mt-2' : '')}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
