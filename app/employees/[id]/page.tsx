import { getContent, getContentIds, getContents } from '@/libs/microcms';
import Header from '@/components/Header';
import DealsList from '@/components/DealsList';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Deal, Employee } from '@/libs/types';
import { DEALS_LIST_FIELDS, FETCH_LIMIT } from '@/constants';
import styles from '@/app/detail.module.scss';

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = await getContent<Employee>('employees', id);
  if (!employee) notFound();

  // この担当者が付いている商談・案件（deals.employee が複数コンテンツ参照のため contains で絞る）
  const deals = await getContents<Deal>('deals', {
    filters: `employee[contains]${id}`,
    fields: DEALS_LIST_FIELDS,
    limit: FETCH_LIMIT,
  });

  return (
    <>
      <Header title="自社担当者" />
      <div className={styles.wrapper}>
        <aside>
          <Link href="/employees" className="c-btn__line sm u-mb16">
            一覧へ戻る
          </Link>
          <Image
            src={employee.thumbnail?.url ?? '/img/common/no-image.webp'}
            width={employee.thumbnail?.width ?? 320}
            height={employee.thumbnail?.height ?? 240}
            sizes="(min-width: 1024px) 20rem, 100vw"
            alt=""
            priority
            unoptimized // 一時的に追加
            className={styles.thumbnail}
          />
        </aside>

        <div className="u-align vertical start u-gap24">
          <h2 className={styles.title}>{employee.name}</h2>

          {employee.profile && (
            <div className={styles.content}>
              <h3 className="u-mb16">プロフィール</h3>
              <div dangerouslySetInnerHTML={{ __html: employee.profile }} />
            </div>
          )}

          <section className={styles.content}>
            <h3 className="u-mb16">担当している商談・案件</h3>
            <DealsList deals={deals} />
          </section>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const contentIds = await getContentIds('employees');

  return contentIds.map((contentId) => ({ id: contentId }));
}
