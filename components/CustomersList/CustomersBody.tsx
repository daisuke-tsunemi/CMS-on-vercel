'use client';

import { useCallback } from 'react';
import CustomersList from '@/components/CustomersList';
import Pagination from '@/components/List/Pagination';
import SearchBox from '@/components/List/SearchBox';
import { useListFilter } from '@/components/List/useListFilter';
import type { Customer } from '@/libs/types';

type Props = {
  customers: Customer[];
};

export default function CustomersBody({ customers }: Props) {
  const searchText = useCallback(
    (customer: Customer) => `${customer.name} ${customer.person ?? ''} ${customer.mail ?? ''}`,
    [],
  );
  const { keyword, setKeyword, pageItems, currentPage, totalPages } = useListFilter(
    customers,
    searchText,
  );

  return (
    <>
      <SearchBox
        keyword={keyword}
        placeholder="顧客名・担当者名・メールで検索"
        onKeywordChange={setKeyword}
      />
      <CustomersList customers={pageItems} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
