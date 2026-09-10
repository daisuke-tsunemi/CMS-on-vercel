'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './search.module.scss';

type Props = {
  keyword: string;
  placeholder?: string;
  onKeywordChange: (next: string) => void;
  /** 検索欄の右に並べる追加フィルタ（担当者ラジオなど） */
  children?: React.ReactNode;
};

export default function SearchBox({
  keyword,
  placeholder = 'キーワードで検索',
  onKeywordChange,
  children,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (next: string) => {
    onKeywordChange(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set('q', next);
    else params.delete('q');
    // 絞り込みが変わったら1ページ目に戻す
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="u-align wrap bottom u-gap8 u-mb32">
      <input
        type="search"
        name="q"
        className={styles.search}
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => handleChange(e.target.value)}
      />
      {children}
    </div>
  );
}
