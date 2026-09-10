import { getContent, getContentIds, getContents } from '@/libs/microcms';
import Header from '@/components/Header';
import DealsList from '@/components/DealsList';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EMPTY_LABEL, formatPrice } from '@/libs/format';
import type { Deal, Service } from '@/libs/types';
import { DEALS_LIST_FIELDS, FETCH_LIMIT } from '@/constants';
import styles from '@/app/detail.module.scss';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getContent<Service>('services', id);
  if (!service) notFound();

  // このサービスに紐づく商談・案件（deals.service が単一コンテンツ参照）
  const deals = await getContents<Deal>('deals', {
    filters: `service[equals]${id}`,
    fields: DEALS_LIST_FIELDS,
    limit: FETCH_LIMIT,
  });

  const thumbnail = service['service-thumbnail'];
  const price = formatPrice(service['service-price']);

  return (
    <>
      <Header title="商材・サービス" />
      <div className={styles.wrapper}>
        <aside>
          <Link href="/services" className="c-btn__line sm u-mb16">
            一覧へ戻る
          </Link>
          <Image
            src={thumbnail?.url ?? '/img/common/no-image.webp'}
            width={thumbnail?.width ?? 320}
            height={thumbnail?.height ?? 240}
            sizes="(min-width: 1024px) 20rem, 100vw"
            alt=""
            priority
            unoptimized // 一時的に追加
            className={styles.thumbnail}
          />
          <dl>
            <dt className="u-mb4">価格</dt>
            <dd className="u-mb16">{price ? <strong>{price} 円</strong> : <span>{EMPTY_LABEL}</span>}</dd>
          </dl>
        </aside>

        <div className="u-align vertical start u-gap24">
          <h2 className={styles.title}>{service['service-name']}</h2>

          <section className={styles.content}>
            <h3 className="u-mb16">このサービスの商談・案件</h3>
            <DealsList deals={deals} />
          </section>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const contentIds = await getContentIds('services');

  return contentIds.map((contentId) => ({ id: contentId }));
}
