'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LIMIT } from '@/constants';

/**
 * 一覧画面共通のキーワード絞り込み＋ページング。
 * 追加の絞り込み（担当者など）は呼び出し側で items を絞ってから渡す。
 */
export function useListFilter<T>(items: T[], searchText: (item: T) => string) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') ?? '1';

  const [keyword, setKeyword] = useState(searchParams.get('q') ?? '');

  const filteredItems = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => searchText(item).toLowerCase().includes(q));
  }, [items, keyword, searchText]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / LIMIT));
  const currentPage = Math.min(Math.max(Number(pageParam) || 1, 1), totalPages);
  const offset = (currentPage - 1) * LIMIT;
  const pageItems = filteredItems.slice(offset, offset + LIMIT);

  return { keyword, setKeyword, filteredItems, pageItems, currentPage, totalPages };
}
