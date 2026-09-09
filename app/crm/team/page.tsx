import type { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/crm/ui/card"
import { Avatar, AvatarFallback } from "@/components/crm/ui/avatar"
import { Progress } from "@/components/crm/ui/progress"
import { Badge } from "@/components/crm/ui/badge"
import { teamMembers, formatCurrency } from "@/lib/crm/data"

export const metadata: Metadata = {
  title: "チーム",
}

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">チーム</h1>
        <p className="text-sm text-muted-foreground">営業担当者ごとの目標達成状況です。</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => {
          const attainment = Math.round((member.closedWon / member.quota) * 100)
          return (
            <Card key={member.id} className="border-border bg-card">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/15 text-sm font-medium text-primary">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">目標達成率</span>
                    <span className="font-mono text-sm tabular-nums">{attainment}%</span>
                  </div>
                  <Progress value={Math.min(attainment, 100)} className="h-1.5" />
                  <div className="mt-1 flex justify-between font-mono text-xs text-muted-foreground">
                    <span>{formatCurrency(member.closedWon)}</span>
                    <span>{formatCurrency(member.quota)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">進行中の取引</span>
                    <span className="font-mono tabular-nums">{member.dealsInProgress}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs text-muted-foreground">成約率</span>
                    <span className="font-mono tabular-nums">{member.winRate}%</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={attainment >= 100 ? "bg-success/15 text-success" : "bg-secondary"}
                  >
                    {attainment >= 100 ? "目標達成" : "進行中"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
