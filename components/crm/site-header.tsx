import { Search, Bell } from "lucide-react"

import { SidebarTrigger } from "@/components/crm/ui/sidebar"
import { Separator } from "@/components/crm/ui/separator"
import { Input } from "@/components/crm/ui/input"
import { Button } from "@/components/crm/ui/button"
import { Avatar, AvatarFallback } from "@/components/crm/ui/avatar"
import { DateRangePicker } from "@/components/crm/date-range-picker"

export function SiteHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card/60 px-4 backdrop-blur-sm">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="企業、取引、担当者を検索..."
          className="h-9 border-none bg-secondary pl-8 focus-visible:ring-1"
        />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <DateRangePicker />
        <Button variant="ghost" size="icon" className="relative">
          <Bell />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-accent" />
          <span className="sr-only">通知</span>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary/15 text-xs font-medium text-primary">伊藤</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
