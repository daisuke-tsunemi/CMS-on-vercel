"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/crm/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/crm/ui/chart"
import { pipelineByStage, formatCurrency } from "@/lib/crm/data"

const chartConfig: ChartConfig = {
  value: {
    label: "パイプライン金額",
  },
}

const barColors = [
  "var(--color-chart-5)",
  "var(--color-chart-4)",
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
]

export function PipelineStageChart() {
  return (
    <Card className="h-full border-border bg-card">
      <CardHeader>
        <CardTitle>ステージ別パイプライン</CardTitle>
        <CardDescription>各ステージにおける取引金額の分布</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={pipelineByStage} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid horizontal={false} stroke="var(--color-border)" />
            <XAxis
              type="number"
              tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="label"
              tickLine={false}
              axisLine={false}
              width={72}
              tick={{ fill: "var(--color-foreground)", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{ fill: "var(--color-secondary)" }}
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                  labelKey="label"
                />
              }
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
              {pipelineByStage.map((entry, index) => (
                <Cell key={entry.stage} fill={barColors[index % barColors.length]} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                formatter={(v: number) => `${v}件`}
                className="fill-muted-foreground text-xs"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
