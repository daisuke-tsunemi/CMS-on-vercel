'use client';

import { useCallback } from 'react';
import ActivitiesList from '@/components/ActivitiesList';
import Pagination from '@/components/List/Pagination';
import SearchBox from '@/components/List/SearchBox';
import { useListFilter } from '@/components/List/useListFilter';
import type { Activity } from '@/libs/types';

type Props = {
  activities: Activity[];
};

export default function ActivitiesBody({ activities }: Props) {
  const searchText = useCallback(
    (activity: Activity) =>
      `${activity.deals?.title ?? ''} ${activity['activity-content'] ?? ''} ${activity['activity-next'] ?? ''}`,
    [],
  );
  const { keyword, setKeyword, pageItems, currentPage, totalPages } = useListFilter(
    activities,
    searchText,
  );

  return (
    <>
      <SearchBox
        keyword={keyword}
        placeholder="案件名・活動内容で検索"
        onKeywordChange={setKeyword}
      />
      <ActivitiesList activities={pageItems} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
