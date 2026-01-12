import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { DashboardPage } from "@/components/pages/dashboard-page"
import { ExpensesPage } from "@/components/pages/expenses-page"
import { AnalyticsPage } from "@/components/pages/analytics-page"
import { SettingsPage } from "@/components/pages/settings-page"

export type PageType = "dashboard" | "expenses" | "analytics" | "settings"

interface DashboardAppProps {
  onLogout: () => void
  userEmail: string
  userName: string
}

export function DashboardApp({ onLogout, userEmail, userName }: DashboardAppProps) {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pageTitles: Record<PageType, string> = {
    dashboard: "Dashboard",
    expenses: "Expenses",
    analytics: "Analytics",
    settings: "Settings",
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />
      case "expenses":
        return <ExpensesPage />
      case "analytics":
        return <AnalyticsPage />
      case "settings":
        return <SettingsPage userEmail={userEmail} userName={userName} />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page)
          setSidebarOpen(false)
        }}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          title={pageTitles[currentPage]}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={onLogout}
          userName={userName}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{renderPage()}</main>
      </div>
    </div>
  )
}
