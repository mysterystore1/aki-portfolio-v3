'use client';

import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    twttr?: {
      widgets?: { load: (el?: HTMLElement) => void };
      ready?: (cb: () => void) => void;
      events?: { bind: (name: string, cb: () => void) => void };
    };
    __twttrWidgetsLoading?: boolean;
  }
}

/**
 * Twitter widgets.js を1回だけ読み込み、ready を待ってコールバックを呼ぶ
 */
function ensureWidgets(onReady: () => void) {
  // Already loaded
  if (window.twttr?.widgets?.load) {
    onReady();
    return;
  }
  // Already loading — wait for ready event
  if (window.__twttrWidgetsLoading) {
    const check = setInterval(() => {
      if (window.twttr?.widgets?.load) {
        clearInterval(check);
        onReady();
      }
    }, 200);
    return;
  }
  // Load the script
  window.__twttrWidgetsLoading = true;
  const script = document.createElement('script');
  script.src = 'https://platform.twitter.com/widgets.js';
  script.async = true;
  script.charset = 'utf-8';
  script.onload = () => {
    const check = setInterval(() => {
      if (window.twttr?.widgets?.load) {
        clearInterval(check);
        onReady();
      }
    }, 100);
  };
  document.head.appendChild(script);
}

/**
 * oEmbed HTML を表示し、widgets.js でカードに変換する
 */
export default function TweetEmbed({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  const renderWidget = useCallback(() => {
    if (!ref.current || loaded.current) return;
    loaded.current = true;
    window.twttr?.widgets?.load(ref.current);
  }, []);

  useEffect(() => {
    if (!ref.current || !html) return;
    ensureWidgets(renderWidget);
  }, [html, renderWidget]);

  // dangerouslySetInnerHTML でサーバーから受けた oEmbed HTML をそのまま描画
  return (
    <div
      ref={ref}
      className="tweet-embed-wrap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * ページに1回だけ Twitter widgets.js を読み込むコンポーネント（不要になったが互換用に残す）
 */
export function TwitterWidgetsScript() {
  return null;
}
