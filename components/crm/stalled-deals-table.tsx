import { AlertTriangle } from "lucide-react"

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
import { Button } from "@/components/crm/ui/button"
import { StageBadge } from "@/components/crm/stage-badge"
import { getStalledDeals, formatCurrency } from "@/lib/crm/data"
import { cn } from "@/lib/crm/utils"

export function StalledDealsTable() {
  const stalled = getStalledDeals()

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-destructive" />
          <CardTitle>要対応: 高額停滞取引</CardTitle>
        </div>
        <CardDescription>直近のアクティビティがない高額取引です。担当者へのフォローアップを推奨します。</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>取引名</TableHead>
              <TableHead>クライアント企業</TableHead>
              <TableHead className="text-right">取引金額</TableHead>
              <TableHead>ステージ</TableHead>
              <TableHead>担当者</TableHead>
              <TableHead className="text-right">停滞日数</TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stalled.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.companyName}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {formatCurrency(deal.value)}
                </TableCell>
                <TableCell>
                  <StageBadge stage={deal.stage} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="bg-secondary text-[10px]">
                        {deal.ownerInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{deal.ownerName}</span>
                  </div>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-mono tabular-nums",
                    deal.daysStalled > 14 && "font-semibold text-destructive"
                  )}
                >
                  {deal.daysStalled}日
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    担当者へ通知
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
