import { ArrowUpRight, TrendingUp, AlertTriangle, Wallet } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/crm/ui/card"
import { Badge } from "@/components/crm/ui/badge"
import { kpis, formatCurrency } from "@/lib/crm/data"

const trendData = kpis.winRateTrend.map((v, i) => ({ i, v }))

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div>
            <CardDescription>今月の受注金額 (MTD)</CardDescription>
            <CardTitle className="mt-1 font-mono text-2xl tabular-nums">
              {formatCurrency(kpis.revenueWonMTDDisplay)}
            </CardTitle>
          </div>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
            <Wallet className="size-4.5" />
          </div>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="gap-1 bg-success/15 text-success">
            <ArrowUpRight className="size-3" />
            前月比 +12%
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div>
            <CardDescription>パイプライン総額</CardDescription>
            <CardTitle className="mt-1 font-mono text-2xl tabular-nums">
              {formatCurrency(kpis.pipelineValue)}
            </CardTitle>
          </div>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-chart-3/15 text-chart-3">
            <TrendingUp className="size-4.5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">進行中の全取引合計</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div>
            <CardDescription>成約率</CardDescription>
            <CardTitle className="mt-1 font-mono text-2xl tabular-nums">{kpis.winRate}%</CardTitle>
          </div>
          <div className="h-9 w-16 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="var(--color-success)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">直近6ヶ月で上昇傾向</p>
        </CardContent>
      </Card>

      <Card className="border-destructive/40 bg-card">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div>
            <CardDescription>停滞中の取引</CardDescription>
            <CardTitle className="mt-1 font-mono text-2xl tabular-nums text-destructive">
              {kpis.stalledDeals}
            </CardTitle>
          </div>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/15 text-destructive">
            <AlertTriangle className="size-4.5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-destructive">14日以上アクティビティなし・要対応</p>
        </CardContent>
      </Card>
    </div>
  )
}
