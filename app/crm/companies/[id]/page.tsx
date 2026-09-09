import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Building2, Globe, Phone, MapPin, User } from "lucide-react"

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
import { Separator } from "@/components/crm/ui/separator"
import { StageBadge } from "@/components/crm/stage-badge"
import { getCompanyById, getDealsForCompany, companies, formatCurrency } from "@/lib/crm/data"

export function generateStaticParams() {
  return companies.map((c) => ({ id: c.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const company = getCompanyById(id)
  return { title: company?.name ?? "企業" }
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const company = getCompanyById(id)
  if (!company) notFound()

  const companyDeals = getDealsForCompany(id)
  const openValue = companyDeals
    .filter((d) => !["closed_won", "closed_lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/crm/companies"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          企業一覧へ戻る
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Building2 className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{company.name}</h1>
              <p className="text-sm text-muted-foreground">
                {company.industry} · {company.tier}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription>ARR</CardDescription>
            <CardTitle className="font-mono text-xl tabular-nums">{formatCurrency(company.arr)}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription>進行中パイプライン</CardDescription>
            <CardTitle className="font-mono text-xl tabular-nums">{formatCurrency(openValue)}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription>従業員数</CardDescription>
            <CardTitle className="font-mono text-xl tabular-nums">
              {company.employees.toLocaleString("en-US")}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription>ヘルススコア</CardDescription>
            <CardTitle className="font-mono text-xl tabular-nums">{company.healthScore}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader>
            <CardTitle>企業情報</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-2.5">
              <Globe className="size-4 text-muted-foreground" />
              <span>{company.website}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="size-4 text-muted-foreground" />
              <span className="font-mono">{company.phone}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>{company.address}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2.5">
              <User className="size-4 text-muted-foreground" />
              <span>担当: {company.owner}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle>関連取引</CardTitle>
            <CardDescription>この企業に紐づく全{companyDeals.length}件の取引</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>取引名</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                  <TableHead>ステージ</TableHead>
                  <TableHead>担当者</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companyDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <Link href={`/crm/deals/${deal.id}`} className="font-medium hover:text-primary hover:underline">
                        {deal.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatCurrency(deal.value)}
                    </TableCell>
                    <TableCell>
                      <StageBadge stage={deal.stage} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{deal.ownerName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
