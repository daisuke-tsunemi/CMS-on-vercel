import dayjs from 'dayjs';

/** 未入力を表す共通ラベル */
export const EMPTY_LABEL = '未設定';

/** 金額を「28,000」形式にする。数値化できない場合は元の文字列をそのまま返す */
export const formatPrice = (value?: string | number | null): string | null => {
  if (value === undefined || value === null || value === '') return null;
  const num = Number(value);
  return Number.isNaN(num) ? String(value) : num.toLocaleString('ja-JP');
};

/** 日付を「2026.09.09」形式にする */
export const formatDate = (value?: string | null): string | null =>
  value ? dayjs(value).format('YYYY.MM.DD') : null;

/** 日時を「2026.09.09 17:00」形式にする */
export const formatDateTime = (value?: string | null): string | null =>
  value ? dayjs(value).format('YYYY.MM.DD HH:mm') : null;

/** セレクトフィールド（配列で返る）を「A / B」形式にする */
export const formatSelect = (value?: string[] | null): string | null =>
  value && value.length > 0 ? value.join(' / ') : null;
