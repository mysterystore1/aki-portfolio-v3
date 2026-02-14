import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-24">
        <span className="rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          404
        </span>
        <h1 className="text-3xl font-bold text-ink-900">
          ページが見つかりませんでした
        </h1>
        <p className="text-base text-ink-700">
          URLをご確認のうえ、トップページへお戻りください。
        </p>
        <Link
          href="/jp"
          className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-ink-700"
        >
          JPトップへ
        </Link>
      </div>
    </main>
  );
}
