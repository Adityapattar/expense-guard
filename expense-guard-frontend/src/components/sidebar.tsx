import type React from "react"

import { cn } from "@/lib/utils"
import { LayoutDashboard, Receipt, BarChart3, Settings, Shield, X } from "lucide-react"
import type { PageType } from "@/components/dashboard-app"

const navItems: { label: string; page: PageType; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "Dashboard", page: "dashboard", icon: LayoutDashboard },
  { label: "Expenses", page: "expenses", icon: Receipt },
  { label: "Analytics", page: "analytics", icon: BarChart3 },
  { label: "Settings", page: "settings", icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentPage: PageType
  onNavigate: (page: PageType) => void
}

export function Sidebar({ isOpen, onClose, currentPage, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Expense Guard</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = currentPage === item.page
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">© 2026 Expense Guard</p>
        </div>
      </aside>
    </>
  )
}
