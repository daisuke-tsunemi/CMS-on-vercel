'use client';

import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DealsList from '@/components/DealsList';
import DealsFilter from '@/components/DealsList/DealsFilter';
import Pagination from '@/components/List/Pagination';
import SearchBox from '@/components/List/SearchBox';
import { useListFilter } from '@/components/List/useListFilter';
import type { Deal } from '@/libs/types';

type Props = {
  deals: Deal[];
};

export default function DealsBody({ deals }: Props) {
  const searchParams = useSearchParams();
  const [employeeId, setEmployeeId] = useState(searchParams.get('employee') ?? '');

  // 担当者の選択肢は取得済みデータから重複を除いて組み立てる
  const employees = useMemo(() => {
    const map = new Map<string, { id: string; name: string }>();
    for (const deal of deals) {
      for (const { id, name } of deal.employee ?? []) {
        if (!id || !name) continue;
        map.set(id, { id, name });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  }, [deals]);

  // 担当者で絞ってからキーワード検索＋ページングに渡す
  const employeeFiltered = useMemo(
    () =>
      employeeId
        ? deals.filter((deal) => (deal.employee ?? []).some((e) => e.id === employeeId))
        : deals,
    [deals, employeeId],
  );

  const searchText = useCallback(
    (deal: Deal) => `${deal.title} ${deal.customer?.name ?? ''}`,
    [],
  );
  const { keyword, setKeyword, pageItems, currentPage, totalPages } = useListFilter(
    employeeFiltered,
    searchText,
  );

  return (
    <>
      <SearchBox
        keyword={keyword}
        placeholder="案件名・顧客名で検索"
        onKeywordChange={setKeyword}
      >
        <DealsFilter
          employeeId={employeeId}
          employees={employees}
          onEmployeeChange={setEmployeeId}
        />
      </SearchBox>
      <DealsList deals={pageItems} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
