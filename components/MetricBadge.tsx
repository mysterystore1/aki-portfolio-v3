import { cn } from '@/lib/utils';

export default function MetricBadge({
  label,
  value,
  className
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-ink-900 shadow-sm',
        className
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}
