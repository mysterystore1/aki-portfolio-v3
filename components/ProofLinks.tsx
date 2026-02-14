'use client';

import type { ProofLink } from '@/lib/microcms';
import { cn } from '@/lib/utils';

type ProofVariant = 'compact' | 'full';

const matchers = [
  {
    key: 'x',
    label: 'X',
    short: 'X',
    match: ['x.com', 'twitter.com']
  },
  {
    key: 'youtube',
    label: 'YouTube',
    short: 'YT',
    match: ['youtube.com', 'youtu.be']
  },
  {
    key: 'article',
    label: 'Article',
    short: '記事',
    match: ['medium.com', 'note.com', 'substack.com', 'mirror.xyz']
  }
];

function resolveProofKind(url: string) {
  const lower = url.toLowerCase();
  return (
    matchers.find((matcher) => matcher.match.some((host) => lower.includes(host))) ??
    { key: 'link', label: 'Link', short: 'Link' }
  );
}

export default function ProofLinks({
  links,
  variant = 'compact',
  className
}: {
  links: ProofLink[];
  variant?: ProofVariant;
  className?: string;
}) {
  if (!links.length) return null;

  const badgeClasses =
    variant === 'compact'
      ? 'px-2 py-1 text-[10px]'
      : 'px-3 py-1.5 text-xs';

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {links.map((link) => {
        const kind = resolveProofKind(link.url);
        return (
          <a
            key={`${kind.key}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.label}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 font-semibold text-sky-900 transition hover:border-sky-300',
              badgeClasses
            )}
          >
            <span className="uppercase">{kind.short}</span>
            {variant === 'full' ? <span className="font-normal">{link.label}</span> : null}
          </a>
        );
      })}
    </div>
  );
}
