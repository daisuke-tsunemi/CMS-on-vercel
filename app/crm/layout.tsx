import type { Metadata, Viewport } from "next"
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/crm/ui/sidebar"
import { TooltipProvider } from "@/components/crm/ui/tooltip"
import { AppSidebar } from "@/components/crm/app-sidebar"
import { SiteHeader } from "@/components/crm/site-header"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-crm-sans",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-crm-mono",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Executive CRM",
    default: "Executive CRM & Sales Pipeline",
  },
  description: "経営層向け営業パイプライン管理ダッシュボード",
  robots: "noindex, nofollow",
}

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  userScalable: true,
}

export default function CrmRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${jetBrainsMono.variable} dark`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <TooltipProvider delayDuration={200}>
          <SidebarProvider defaultOpen>
            <AppSidebar />
            <SidebarInset>
              <SiteHeader />
              <main className="flex flex-1 flex-col gap-6 overflow-x-hidden p-4 md:p-6">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
