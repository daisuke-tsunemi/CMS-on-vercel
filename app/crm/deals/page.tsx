import type { Metadata } from "next"
import Link from "next/link"

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
import { Avatar, AvatarFallback } from "@/components/crm/ui/avatar"
import { StageBadge } from "@/components/crm/stage-badge"
import { deals, formatCurrency } from "@/lib/crm/data"
import { cn } from "@/lib/crm/utils"

export const metadata: Metadata = {
  title: "取引",
}

export default function DealsPage() {
  const sorted = [...deals].sort((a, b) => b.value - a.value)
  const totalOpen = deals
    .filter((d) => !["closed_won", "closed_lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">取引</h1>
          <p className="text-sm text-muted-foreground">
            全{deals.length}件の取引・進行中パイプライン {formatCurrency(totalOpen)}
          </p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>取引一覧</CardTitle>
          <CardDescription>金額の大きい順に表示しています</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>取引名</TableHead>
                <TableHead>クライアント企業</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead>ステージ</TableHead>
                <TableHead className="text-right">確度</TableHead>
                <TableHead>担当者</TableHead>
                <TableHead>成約予定日</TableHead>
                <TableHead className="text-right">停滞日数</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <Link href={`/crm/deals/${deal.id}`} className="font-medium hover:text-primary hover:underline">
                      {deal.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{deal.companyName}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {formatCurrency(deal.value)}
                  </TableCell>
                  <TableCell>
                    <StageBadge stage={deal.stage} />
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                    {deal.probability}%
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="bg-secondary text-[10px]">{deal.ownerInitials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{deal.ownerName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{deal.closeDate}</TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-mono tabular-nums",
                      deal.daysStalled > 14 && "font-semibold text-destructive"
                    )}
                  >
                    {deal.daysStalled > 0 ? `${deal.daysStalled}日` : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
