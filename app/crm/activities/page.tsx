import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Mail, MessageSquare, StickyNote } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/crm/ui/card"
import { Avatar, AvatarFallback } from "@/components/crm/ui/avatar"
import { Badge } from "@/components/crm/ui/badge"
import { activities } from "@/lib/crm/data"

export const metadata: Metadata = {
  title: "活動",
}

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: MessageSquare,
  note: StickyNote,
}

const activityLabels: Record<string, string> = {
  call: "電話",
  email: "メール",
  meeting: "商談",
  note: "メモ",
}

export default function ActivitiesPage() {
  const sorted = [...activities].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">活動</h1>
        <p className="text-sm text-muted-foreground">全社の商談・電話・メール・メモの最新履歴です。</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>最新のアクティビティ</CardTitle>
          <CardDescription>新しい順に表示しています</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-0">
            {sorted.map((activity) => {
              const Icon = activityIcons[activity.type]
              return (
                <li key={activity.id} className="flex gap-3 border-b border-border py-4 last:border-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{activityLabels[activity.type]}</Badge>
                      <Link
                        href={`/crm/deals/${activity.dealId}`}
                        className="text-sm font-medium hover:text-primary hover:underline"
                      >
                        {activity.dealName}
                      </Link>
                      <span className="text-xs text-muted-foreground">· {activity.companyName}</span>
                      <span className="ml-auto font-mono text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.summary}</p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[9px]">{activity.repInitials}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{activity.repName}</span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
