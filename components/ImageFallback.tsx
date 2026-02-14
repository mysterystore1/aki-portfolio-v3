import { cn } from '@/lib/utils';
import { copyPack } from '@/lib/copy-pack';

export default function ImageFallback({
  label,
  subLabel,
  className
}: {
  label: string;
  subLabel?: string;
  className?: string;
}) {
  const fallbackSub = subLabel || copyPack.home.hero.rightCard.title.ja;

  return (
    <div
      className={cn(
        'absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink-900 via-ink-700 to-accent-600 text-white',
        className
      )}
    >
      <span className="text-xs uppercase tracking-[0.4em] text-white/70">
        {fallbackSub}
      </span>
      <span className="text-lg font-semibold">{label}</span>
    </div>
  );
}
