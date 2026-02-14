'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export default function DmTemplateBox({
  template,
  locale,
  context = 'footer',
  className
}: {
  template: string;
  locale: 'jp' | 'en';
  context?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copyLabel = locale === 'jp' ? 'コピー' : 'Copy';
  const toast = locale === 'jp' ? 'コピーしました！' : 'Copied!';
  const helper = locale === 'jp' ? 'DMテンプレ' : 'DM template';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(template);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = template;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      trackEvent('dm_template_copy', { locale, context });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-slate-200 bg-slate-900 px-4 py-4 text-slate-100 shadow-sm',
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
          {helper}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-white/20"
        >
          {copyLabel}
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-xs leading-6 text-slate-100">
        {template}
      </pre>
      {copied ? (
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink-900/90 px-3 py-1 text-[10px] font-semibold text-white">
          {toast}
        </span>
      ) : null}
    </div>
  );
}
