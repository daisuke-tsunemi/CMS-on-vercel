// app/customers/page.tsx
import { getContents } from '@/libs/microcms';
import CustomersBody from '@/components/CustomersList/CustomersBody';
import Header from '@/components/Header';
import type { Customer } from '@/libs/types';
import { FETCH_LIMIT } from '@/constants';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Customers() {
  const customers = await getContents<Customer>('customers', {
    fields: 'id,name,person,priority,tel,mail',
    limit: FETCH_LIMIT,
  });

  return (
    <>
      <Header title="顧客一覧" />
      <section>
        <CustomersBody customers={customers} />
      </section>
    </>
  );
}
