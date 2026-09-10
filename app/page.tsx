import Header from '@/components/Header';
import ChartCard from '@/components/Dashboard/ChartCard';
import StatTiles from '@/components/Dashboard/StatTiles';
import SalesTrendChart from '@/components/Dashboard/SalesTrendChart';
import StatusBreakdownChart from '@/components/Dashboard/StatusBreakdownChart';
import EmployeeSalesChart from '@/components/Dashboard/EmployeeSalesChart';
import {
  EmployeeSalesTable,
  MonthlyTrendTable,
  StatusBreakdownTable,
} from '@/components/Dashboard/ChartTables';
import { getAllContents } from '@/libs/microcms';
import {
  buildEmployeeSales,
  buildMonthlyTrend,
  buildStatusBreakdown,
  buildSummary,
} from '@/libs/analytics';
import type { Deal } from '@/libs/types';
import {
  DASHBOARD_EMPLOYEE_LIMIT,
  DASHBOARD_MONTHS,
  DEALS_ANALYTICS_FIELDS,
} from '@/constants';
import styles from '@/components/Dashboard/dashboard.module.scss';

// 集計は全件取得が必要なので都度リクエストせず5分間キャッシュする
export const revalidate = 300;

export default async function Home() {
  const { contents: deals, totalCount, truncated } = await getAllContents<Deal>('deals', {
    fields: DEALS_ANALYTICS_FIELDS,
    orders: '-publishedAt',
  });

  const summary = buildSummary(deals);
  const monthly = buildMonthlyTrend(deals, DASHBOARD_MONTHS);
  const statuses = buildStatusBreakdown(deals);
  const employees = buildEmployeeSales(deals, DASHBOARD_EMPLOYEE_LIMIT);

  return (
    <>
      <Header title="ダッシュボード" />

      {truncated && (
        <p className={`${styles.notice} u-mb24`}>
          商談 {totalCount.toLocaleString('ja-JP')} 件のうち、直近{' '}
          {deals.length.toLocaleString('ja-JP')} 件を集計対象にしています。
        </p>
      )}

      <div className="u-mb24">
        <StatTiles summary={summary} />
      </div>

      <div className={styles.grid}>
        <div className={styles.grid__wide}>
          <ChartCard
            title="月別 売上・見込み金額の推移"
            note={`直近 ${DASHBOARD_MONTHS} ヶ月／商談の公開日で集計`}
            table={<MonthlyTrendTable data={monthly} />}
          >
            <SalesTrendChart data={monthly} />
          </ChartCard>
        </div>

        <ChartCard
          title="ステータス別 商談数"
          note="色の濃さがパイプラインの進行度を表す"
          table={<StatusBreakdownTable data={statuses} />}
        >
          <StatusBreakdownChart data={statuses} />
        </ChartCard>

        <ChartCard
          title="担当者別 売上金額"
          note="複数担当の案件は各担当に満額を計上（合計は売上金額と一致しない）"
          table={<EmployeeSalesTable data={employees} />}
        >
          <EmployeeSalesChart data={employees} />
        </ChartCard>
      </div>
    </>
  );
}
