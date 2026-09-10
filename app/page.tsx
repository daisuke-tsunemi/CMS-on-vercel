import { getContents } from '@/libs/microcms';
import DealsList from '@/components/DealsList';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import type { Deal } from '@/libs/types';
import styles from './home.module.scss';
import { DEALS_LIST_FIELDS, HomeLIMIT } from '@/constants';

const PER_PAGE = HomeLIMIT; // 1ページあたりの表示件数

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>; // Promiseを追加
}) {
  const params = await searchParams; // awaitで取得
  const currentPage = Number(params.page) || 1;
  const deals = await getContents<Deal>('deals', {
    fields: DEALS_LIST_FIELDS,
    limit: PER_PAGE,
    offset: (currentPage - 1) * PER_PAGE,
  });
  return (
    <>
      <Header title="ダッシュボード" />
      <div className={styles.wrapper}>
        <Image
          loading='lazy'
          src="/img/common/robot_1.webp"
          width={200}
          height={201}
          alt="robot"
        />
        <section className={styles.cta}>
          <div>
            <div className={`${styles.section__text} u-mt32`}>
              <div className={`${styles.section__title} u-mb40 u-align between`}>
                <h2 className='c-heading--4xl weight__500'>新着の商談・案件</h2>
                <Link href="/deals" className="c-btn__line sm">
                  商談・案件一覧へ
                </Link>
              </div>
              <div>
                <div className={`${'p-section__body'}`}>
                  <DealsList deals={deals} />
                </div>
              </div>
            </div>
            <div className={`${styles.quote} ${'u-mt40'}`}>
              <h3 className="">アクセス</h3>
              <p className="u-mt16">
                <strong>住所</strong>
                <br />
                〒100-8111
                <br />
                東京都千代田区千代田１−１
              </p>
              <p className="u-mt16">
                <strong>電話番号</strong>
                <br />
                090-1234-5678
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
