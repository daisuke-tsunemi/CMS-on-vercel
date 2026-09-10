import { getContent, getContentIds, getContents } from '@/libs/microcms';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EMPTY_LABEL, formatDate, formatDateTime, formatPrice, formatSelect } from '@/libs/format';
import type { Activity, Deal } from '@/libs/types';
import styles from '@/app/detail.module.scss';

export default async function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getContent<Deal>('deals', id);
  if (!deal) notFound();

  // この案件に紐づく活動履歴（activities.deals が単一コンテンツ参照）
  const activities = await getContents<Activity>('activities', {
    filters: `deals[equals]${id}`,
    orders: '-activatedAt',
    fields: 'id,activatedAt,activity-content,activity-next',
  });

  const publishedAt = formatDate(deal.publishedAt);
  const status = formatSelect(deal.status);
  const estimated = formatPrice(deal.estimated);
  const sales = formatPrice(deal.sales);
  const servicePrice = formatPrice(deal.service?.['service-price']);

  return (
    <>
      <Header title="商談・案件" />
      <div className={styles.wrapper}>
        <aside>
          <Link href="/deals" className="c-btn__line sm u-mb16">
            一覧へ戻る
          </Link>
          <Image
            src={deal.eyecatch?.url ?? '/img/common/no-image.webp'}
            width={deal.eyecatch?.width ?? 320}
            height={deal.eyecatch?.height ?? 240}
            sizes="(min-width: 1024px) 20rem, 100vw"
            alt=""
            priority
            unoptimized // 一時的に追加
            className={styles.thumbnail}
          />
          <dl>
            <dt className="u-mb4">ステータス</dt>
            <dd className="u-mb16">{status ? <strong>{status}</strong> : <span>{EMPTY_LABEL}</span>}</dd>

            <dt className="u-mb4">顧客名</dt>
            <dd className="u-mb16">
              {deal.customer ? (
                <Link href={`/customers/${deal.customer.id}`}>
                  <strong>{deal.customer.name}</strong>
                </Link>
              ) : (
                <span>{EMPTY_LABEL}</span>
              )}
            </dd>

            <dt className="u-mb4">商材・サービス</dt>
            <dd className="u-mb16">
              {deal.service ? (
                <Link href={`/services/${deal.service.id}`}>
                  <strong>{deal.service['service-name']}</strong>
                  {servicePrice && <span>（{servicePrice} 円）</span>}
                </Link>
              ) : (
                <span>{EMPTY_LABEL}</span>
              )}
            </dd>

            <dt className="u-mb4">見込み金額</dt>
            <dd className="u-mb16">{estimated ? <strong>{estimated} 円</strong> : <span>{EMPTY_LABEL}</span>}</dd>

            <dt className="u-mb4">売上金額</dt>
            <dd className="u-mb16">{sales ? <strong>{sales} 円</strong> : <span>{EMPTY_LABEL}</span>}</dd>

            <dt className="u-mb4">自社担当者</dt>
            <dd className="u-mb16">
              {deal.employee && deal.employee.length > 0 ? (
                <div className="u-align wrap u-gap4">
                  {deal.employee.map((employee) => (
                    <Link
                      key={employee.id}
                      href={`/employees/${employee.id}`}
                      className={`${styles.tag} c-heading--sm`}
                    >
                      {employee.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <span>{EMPTY_LABEL}</span>
              )}
            </dd>
          </dl>
        </aside>

        <div className="u-align vertical start u-gap24">
          <div>
            <h2 className={styles.title}>{deal.title}</h2>
            {publishedAt && <time className="c-txt__sm">{publishedAt}</time>}
          </div>

          {deal.content && (
            <div className={styles.content}>
              <div dangerouslySetInnerHTML={{ __html: deal.content }} />
            </div>
          )}

          <section className={styles.content}>
            <h3 className="u-mb16">活動履歴</h3>
            {activities.length === 0 ? (
              <div className="p-data__none">
                <p>この案件に紐づく活動履歴はまだありません。</p>
              </div>
            ) : (
              <dl>
                {activities.map((activity) => (
                  <div key={activity.id} className="u-mb24">
                    <dt className="u-mb4">
                      <Link href={`/activities/${activity.id}`}>
                        <strong>{formatDateTime(activity.activatedAt) ?? EMPTY_LABEL}</strong>
                      </Link>
                    </dt>
                    <dd>
                      <p>{activity['activity-content'] ?? EMPTY_LABEL}</p>
                      {activity['activity-next'] && (
                        <p className="c-txt__sm">次回：{activity['activity-next']}</p>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await getContentIds('deals');

  return contentIds.map((contentId) => ({ id: contentId }));
}
