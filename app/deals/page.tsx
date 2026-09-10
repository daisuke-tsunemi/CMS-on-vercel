// app/deals/page.tsx
import { getContents } from '@/libs/microcms';
import DealsBody from '@/components/DealsList/DealsBody';
import Header from '@/components/Header';
import type { Deal } from '@/libs/types';
import { DEALS_LIST_FIELDS, FETCH_LIMIT } from '@/constants';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Deals() {
  const deals = await getContents<Deal>('deals', {
    fields: DEALS_LIST_FIELDS,
    limit: FETCH_LIMIT,
  });

  return (
    <>
      <Header title="商談・案件一覧" />
      <section>
        <DealsBody deals={deals} />
      </section>
    </>
  );
}
