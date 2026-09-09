"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Handshake,
  Activity,
  Users,
  Settings,
  TrendingUp,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/crm/ui/sidebar"

const navItems = [
  { href: "/crm", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/crm/companies", label: "企業", icon: Building2 },
  { href: "/crm/deals", label: "取引", icon: Handshake },
  { href: "/crm/activities", label: "活動", icon: Activity },
  { href: "/crm/team", label: "チーム", icon: Users },
  { href: "/crm/settings", label: "設定", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/crm">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <TrendingUp className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold tracking-tight">Meridian CRM</span>
                  <span className="text-xs text-muted-foreground">エグゼクティブ営業管理</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.href === "/crm" ? pathname === "/crm" : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/crm/settings">
                <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                  伊藤
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">伊藤 直樹</span>
                  <span className="text-xs text-muted-foreground">営業本部長</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
