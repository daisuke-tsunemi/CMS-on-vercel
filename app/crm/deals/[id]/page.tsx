import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User, Building2, Phone, Mail, MessageSquare, StickyNote } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/crm/ui/card"
import { Avatar, AvatarFallback } from "@/components/crm/ui/avatar"
import { Button } from "@/components/crm/ui/button"
import { Separator } from "@/components/crm/ui/separator"
import { Progress } from "@/components/crm/ui/progress"
import { StageBadge } from "@/components/crm/stage-badge"
import { getDealById, getActivitiesForDeal, deals, formatCurrency } from "@/lib/crm/data"

export function generateStaticParams() {
  return deals.map((d) => ({ id: d.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const deal = getDealById(id)
  return { title: deal?.name ?? "取引" }
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

export default async function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const deal = getDealById(id)
  if (!deal) notFound()

  const dealActivities = getActivitiesForDeal(id)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/crm/deals"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          取引一覧へ戻る
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{deal.name}</h1>
              <StageBadge stage={deal.stage} />
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building2 className="size-3.5" />
              <Link href={`/crm/companies/${deal.companyId}`} className="hover:text-primary hover:underline">
                {deal.companyName}
              </Link>
            </p>
          </div>
          <Button>担当者へ通知</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription>取引金額</CardDescription>
            <CardTitle className="font-mono text-xl tabular-nums">{formatCurrency(deal.value)}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription>成約確度</CardDescription>
            <CardTitle className="font-mono text-xl tabular-nums">{deal.probability}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={deal.probability} className="h-1.5" />
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription>成約予定日</CardDescription>
            <CardTitle className="font-mono text-xl tabular-nums">{deal.closeDate}</CardTitle>
          </CardHeader>
        </Card>
        <Card className={deal.daysStalled > 14 ? "border-destructive/40 bg-card" : "border-border bg-card"}>
          <CardHeader className="pb-2">
            <CardDescription>停滞日数</CardDescription>
            <CardTitle
              className={`font-mono text-xl tabular-nums ${deal.daysStalled > 14 ? "text-destructive" : ""}`}
            >
              {deal.daysStalled}日
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader>
            <CardTitle>担当情報</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-8">
                <AvatarFallback className="bg-secondary text-xs">{deal.ownerInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{deal.ownerName}</p>
                <p className="text-xs text-muted-foreground">担当営業</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Calendar className="size-4" />
              <span>作成日: {deal.createdAt}</span>
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <User className="size-4" />
              <span>最終活動: {deal.lastActivityDate}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle>活動タイムライン</CardTitle>
            <CardDescription>この取引に関連する全{dealActivities.length}件の活動</CardDescription>
          </CardHeader>
          <CardContent>
            {dealActivities.length === 0 ? (
              <p className="text-sm text-muted-foreground">記録された活動はありません。</p>
            ) : (
              <ol className="flex flex-col gap-4">
                {dealActivities.map((activity) => {
                  const Icon = activityIcons[activity.type]
                  return (
                    <li key={activity.id} className="flex gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{activityLabels[activity.type]}</span>
                          <span className="text-xs text-muted-foreground">·{activity.repName}</span>
                          <span className="ml-auto font-mono text-xs text-muted-foreground">{activity.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.summary}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
