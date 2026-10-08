import en from './en.json';
import ar from './ar.json';

export type Lang = 'en' | 'ar';
const DICTS: Record<Lang, Record<string, string>> = { en, ar };

export const langOf = (locale?: string): Lang => (locale === 'ar' ? 'ar' : 'en');

/** Build-time translator. Falls back to English, then to the key itself. */
export function useT(locale?: string) {
  const d = DICTS[langOf(locale)];
  return (key: string): string => d[key] ?? en[key as keyof typeof en] ?? key;
}

/** Strings app.js still needs at runtime (toasts, palette empty state, generated skill levels). */
export const runtimeKeys = ['close', 'cmd.empty', 'toast.copied', 'toast.reset', 'toast.soundOn', 'toast.soundOff', 'lv.x', 'lv.a', 'lv.p'];
export const runtimeDict = (locale?: string) => {
  const t = useT(locale);
  return Object.fromEntries(runtimeKeys.map(k => [k, t(k)]));
};
