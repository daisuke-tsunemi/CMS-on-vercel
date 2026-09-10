'use client';

import { useCallback } from 'react';
import EmployeesList from '@/components/EmployeesList';
import Pagination from '@/components/List/Pagination';
import SearchBox from '@/components/List/SearchBox';
import { useListFilter } from '@/components/List/useListFilter';
import type { Employee } from '@/libs/types';

type Props = {
  employees: Employee[];
};

export default function EmployeesBody({ employees }: Props) {
  const searchText = useCallback((employee: Employee) => employee.name ?? '', []);
  const { keyword, setKeyword, pageItems, currentPage, totalPages } = useListFilter(
    employees,
    searchText,
  );

  return (
    <>
      <SearchBox
        keyword={keyword}
        placeholder="担当者名で検索"
        onKeywordChange={setKeyword}
      />
      <EmployeesList employees={pageItems} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
