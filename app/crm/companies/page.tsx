import type { Metadata } from "next"
import Link from "next/link"
import { Building2, ExternalLink } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/crm/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/crm/ui/table"
import { Badge } from "@/components/crm/ui/badge"
import { companies, deals, formatCurrency } from "@/lib/crm/data"
import { cn } from "@/lib/crm/utils"

export const metadata: Metadata = {
  title: "企業",
}

const tierStyles: Record<string, string> = {
  エンタープライズ: "bg-primary/15 text-primary",
  ミッドマーケット: "bg-chart-4/15 text-chart-4",
  SMB: "bg-secondary text-secondary-foreground",
}

export default function CompaniesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">企業</h1>
          <p className="text-sm text-muted-foreground">取引のあるクライアント企業一覧（全{companies.length}社）</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>企業一覧</CardTitle>
          <CardDescription>ARR順に表示しています</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>企業名</TableHead>
                <TableHead>業種</TableHead>
                <TableHead>ティア</TableHead>
                <TableHead className="text-right">従業員数</TableHead>
                <TableHead className="text-right">ARR</TableHead>
                <TableHead>担当者</TableHead>
                <TableHead className="text-right">進行中取引</TableHead>
                <TableHead className="text-right">ヘルススコア</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...companies]
                .sort((a, b) => b.arr - a.arr)
                .map((company) => {
                  const openDeals = deals.filter(
                    (d) => d.companyId === company.id && !["closed_won", "closed_lost"].includes(d.stage)
                  ).length
                  return (
                    <TableRow key={company.id}>
                      <TableCell>
                        <Link
                          href={`/crm/companies/${company.id}`}
                          className="flex items-center gap-2 font-medium hover:text-primary hover:underline"
                        >
                          <div className="flex size-7 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                            <Building2 className="size-3.5" />
                          </div>
                          {company.name}
                          <ExternalLink className="size-3 text-muted-foreground" />
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{company.industry}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("border-transparent", tierStyles[company.tier])}>
                          {company.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {company.employees.toLocaleString("en-US")}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatCurrency(company.arr)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{company.owner}</TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{openDeals}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "font-mono tabular-nums",
                            company.healthScore >= 75
                              ? "text-success"
                              : company.healthScore >= 55
                                ? "text-warning"
                                : "text-destructive"
                          )}
                        >
                          {company.healthScore}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
