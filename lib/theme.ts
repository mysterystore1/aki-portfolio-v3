/**
 * デザイントークン（A/B/C テーマ切替用）
 * __design プレビューおよび将来の Home テーマ適用で参照する。
 */

export type ThemeId = 'A' | 'B' | 'C';

export const themeTokens: Record<
  ThemeId,
  {
    name: string;
    nameJa: string;
    colors: {
      bg: string;
      bgMuted: string;
      text: string;
      textMuted: string;
      accent: string;
      border: string;
      cardBg: string;
    };
    typography: {
      headingWeight: string;
      bodySize: string;
    };
    spacing: {
      sectionY: string;
      blockGap: string;
    };
    radius: {
      card: string;
      button: string;
    };
    shadow: string;
  }
> = {
  A: {
    name: 'Broadcast Premium',
    nameJa: '清潔・上質・強いタイポ（A+C余白）',
    colors: {
      bg: '#ffffff',
      bgMuted: '#f8fafc',
      text: '#0b0f19',
      textMuted: '#475569',
      accent: '#0b0f19',
      border: '#e2e8f0',
      cardBg: '#ffffff'
    },
    typography: {
      headingWeight: '600',
      bodySize: '1rem'
    },
    spacing: {
      sectionY: '6rem',
      blockGap: '1.75rem'
    },
    radius: {
      card: '1.5rem',
      button: '9999px'
    },
    shadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
  },
  B: {
    name: 'Neo Crypto Funk',
    nameJa: '遊び心＋洗練・グラデ',
    colors: {
      bg: '#0f0a1e',
      bgMuted: '#1a1229',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
      accent: '#a78bfa',
      border: 'rgba(167, 139, 250, 0.3)',
      cardBg: 'rgba(30, 27, 75, 0.6)'
    },
    typography: {
      headingWeight: '700',
      bodySize: '1rem'
    },
    spacing: {
      sectionY: '4rem',
      blockGap: '1.25rem'
    },
    radius: {
      card: '1rem',
      button: '0.75rem'
    },
    shadow: '0 0 40px rgba(167, 139, 250, 0.15)'
  },
  C: {
    name: 'Editorial Minimal',
    nameJa: '雑誌っぽい余白・写真＋文字',
    colors: {
      bg: '#ffffff',
      bgMuted: '#fafafa',
      text: '#0c0c0c',
      textMuted: '#737373',
      accent: '#0c0c0c',
      border: '#e5e5e5',
      cardBg: '#ffffff'
    },
    typography: {
      headingWeight: '600',
      bodySize: '1.0625rem'
    },
    spacing: {
      sectionY: '6rem',
      blockGap: '2rem'
    },
    radius: {
      card: '0.25rem',
      button: '0.25rem'
    },
    shadow: '0 1px 3px rgba(0,0,0,0.06)'
  }
};

export function getThemeCssVars(themeId: ThemeId): Record<string, string> {
  const t = themeTokens[themeId];
  return {
    '--theme-bg': t.colors.bg,
    '--theme-bg-muted': t.colors.bgMuted,
    '--theme-text': t.colors.text,
    '--theme-text-muted': t.colors.textMuted,
    '--theme-accent': t.colors.accent,
    '--theme-border': t.colors.border,
    '--theme-card-bg': t.colors.cardBg,
    '--theme-section-y': t.spacing.sectionY,
    '--theme-block-gap': t.spacing.blockGap,
    '--theme-radius-card': t.radius.card,
    '--theme-radius-button': t.radius.button,
    '--theme-shadow': t.shadow
  };
}
