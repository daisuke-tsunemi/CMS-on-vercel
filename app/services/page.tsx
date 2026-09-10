// app/services/page.tsx
import { getContents } from '@/libs/microcms';
import ServicesBody from '@/components/ServicesList/ServicesBody';
import Header from '@/components/Header';
import type { Service } from '@/libs/types';
import { FETCH_LIMIT } from '@/constants';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Services() {
  const services = await getContents<Service>('services', {
    fields: 'id,service-name,service-price,service-thumbnail',
    limit: FETCH_LIMIT,
  });

  return (
    <>
      <Header title="商材・サービス一覧" />
      <section>
        <ServicesBody services={services} />
      </section>
    </>
  );
}
