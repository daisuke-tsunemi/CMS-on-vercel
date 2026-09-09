"use client"

import { Bar, ComposedChart, CartesianGrid, Line, XAxis, YAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/crm/ui/chart"
import { revenueForecastVsActual, formatCurrency } from "@/lib/crm/data"

const chartConfig: ChartConfig = {
  forecast: {
    label: "予測",
    color: "var(--color-chart-5)",
  },
  actual: {
    label: "実績",
    color: "var(--color-chart-1)",
  },
}

export function RevenueForecastChart() {
  return (
    <Card className="h-full border-border bg-card">
      <CardHeader>
        <CardTitle>売上予測 vs 実績</CardTitle>
        <CardDescription>過去6ヶ月間の予測と実績の比較</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ComposedChart data={revenueForecastVsActual} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              width={44}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="forecast" fill="var(--color-forecast)" radius={[4, 4, 0, 0]} barSize={28} />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="var(--color-actual)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "var(--color-actual)", strokeWidth: 0 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
