import type { Metadata } from "next"

import { KpiCards } from "@/components/crm/kpi-cards"
import { PipelineStageChart } from "@/components/crm/charts/pipeline-stage-chart"
import { RevenueForecastChart } from "@/components/crm/charts/revenue-forecast-chart"
import { StalledDealsTable } from "@/components/crm/stalled-deals-table"

export const metadata: Metadata = {
  title: "ダッシュボード",
}

export default function CrmDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">エグゼクティブ・ダッシュボード</h1>
        <p className="text-sm text-muted-foreground">営業パイプライン全体の健全性と収益指標のサマリーです。</p>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PipelineStageChart />
        <RevenueForecastChart />
      </div>

      <StalledDealsTable />
    </div>
  )
}
