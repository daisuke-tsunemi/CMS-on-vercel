import { getContent, getContentIds, getContents } from '@/libs/microcms';
import Header from '@/components/Header';
import DealsList from '@/components/DealsList';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EMPTY_LABEL, formatSelect } from '@/libs/format';
import type { Customer, Deal } from '@/libs/types';
import { DEALS_LIST_FIELDS, FETCH_LIMIT } from '@/constants';
import styles from '@/app/detail.module.scss';

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await getContent<Customer>('customers', id);
  if (!customer) notFound();

  // この顧客に紐づく商談・案件（deals.customer が単一コンテンツ参照）
  const deals = await getContents<Deal>('deals', {
    filters: `customer[equals]${id}`,
    fields: DEALS_LIST_FIELDS,
    limit: FETCH_LIMIT,
  });

  const priority = formatSelect(customer.priority);

  return (
    <>
      <Header title="顧客" />
      <div className={styles.wrapper}>
        <aside>
          <Link href="/customers" className="c-btn__line sm u-mb16">
            一覧へ戻る
          </Link>
          <dl>
            <dt className="u-mb4">担当者名</dt>
            <dd className="u-mb16">
              {customer.person ? <strong>{customer.person}</strong> : <span>{EMPTY_LABEL}</span>}
            </dd>

            <dt className="u-mb4">優先度</dt>
            <dd className="u-mb16">
              {priority ? <span className={styles.tag}>{priority}</span> : <span>{EMPTY_LABEL}</span>}
            </dd>

            <dt className="u-mb4">住所</dt>
            <dd className="u-mb16">{customer.address ?? <span>{EMPTY_LABEL}</span>}</dd>

            <dt className="u-mb4">電話番号</dt>
            <dd className="u-mb16">
              {customer.tel ? <a href={`tel:${customer.tel}`}>{customer.tel}</a> : <span>{EMPTY_LABEL}</span>}
            </dd>

            <dt className="u-mb4">メールアドレス</dt>
            <dd className="u-mb16">
              {customer.mail ? (
                <a href={`mailto:${customer.mail}`}>{customer.mail}</a>
              ) : (
                <span>{EMPTY_LABEL}</span>
              )}
            </dd>
          </dl>
        </aside>

        <div className="u-align vertical start u-gap24">
          <h2 className={styles.title}>{customer.name}</h2>

          {customer.note && (
            <div className={styles.content}>
              <h3 className="u-mb16">メモ</h3>
              <div dangerouslySetInnerHTML={{ __html: customer.note }} />
            </div>
          )}

          <section className={styles.content}>
            <h3 className="u-mb16">この顧客の商談・案件</h3>
            <DealsList deals={deals} />
          </section>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const contentIds = await getContentIds('customers');

  return contentIds.map((contentId) => ({ id: contentId }));
}
