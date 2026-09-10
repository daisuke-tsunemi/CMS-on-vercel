'use client';

import { useCallback } from 'react';
import ServicesList from '@/components/ServicesList';
import Pagination from '@/components/List/Pagination';
import SearchBox from '@/components/List/SearchBox';
import { useListFilter } from '@/components/List/useListFilter';
import type { Service } from '@/libs/types';

type Props = {
  services: Service[];
};

export default function ServicesBody({ services }: Props) {
  const searchText = useCallback((service: Service) => service['service-name'] ?? '', []);
  const { keyword, setKeyword, pageItems, currentPage, totalPages } = useListFilter(
    services,
    searchText,
  );

  return (
    <>
      <SearchBox
        keyword={keyword}
        placeholder="サービス名で検索"
        onKeywordChange={setKeyword}
      />
      <ServicesList services={pageItems} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
