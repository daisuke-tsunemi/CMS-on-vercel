import type { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/crm/ui/card"
import { Label } from "@/components/crm/ui/label"
import { Input } from "@/components/crm/ui/input"
import { Button } from "@/components/crm/ui/button"
import { Separator } from "@/components/crm/ui/separator"
import { Avatar, AvatarFallback } from "@/components/crm/ui/avatar"

export const metadata: Metadata = {
  title: "設定",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">設定</h1>
        <p className="text-sm text-muted-foreground">アカウント情報と通知設定を管理します。</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader>
            <CardTitle>プロフィール</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 text-center">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/15 text-lg font-medium text-primary">伊藤</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">伊藤 直樹</p>
              <p className="text-sm text-muted-foreground">営業本部長</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              画像を変更
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle>アカウント情報</CardTitle>
            <CardDescription>氏名やメールアドレスなどの基本情報です</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">氏名</Label>
                <Input id="name" defaultValue="伊藤 直樹" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="role">役職</Label>
                <Input id="role" defaultValue="営業本部長" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" defaultValue="ito@example.co.jp" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">電話番号</Label>
                <Input id="phone" defaultValue="03-1234-5600" />
              </div>
            </div>
            <Separator />
            <div className="flex justify-end">
              <Button>保存する</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>通知設定</CardTitle>
          <CardDescription>停滞取引や重要な更新に関する通知を管理します</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[
            { label: "停滞取引アラート", desc: "取引が14日以上停滞した際に通知します" },
            { label: "週次サマリーレポート", desc: "毎週月曜に営業パイプラインのレポートを送付します" },
            { label: "大型取引の成約通知", desc: "1,000万円以上の取引が成約した際に通知します" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Button variant="outline" size="sm">
                有効
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
