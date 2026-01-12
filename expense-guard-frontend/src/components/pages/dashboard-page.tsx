import { useState, useEffect, useRef } from "react"
import { StatCard } from "@/components/stat-card"
import { TransactionTable } from "@/components/transaction-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, TrendingUp, Calendar, PiggyBank } from "lucide-react"

interface Expense {
  id: number
  amount: number
  description: string
  category: string
  date: string
}

export function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const amountRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    fetchExpenses()
    fetchCategories()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/expenses")
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error("Error fetching expenses:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = amountRef.current?.value?.trim()
    const description = descriptionRef.current?.value?.trim()
    const category = categoryRef.current?.value?.trim()

    if (!amount) {
      alert("Please enter an amount")
      return
    }
    if (!description) {
      alert("Please enter a description")
      return
    }
    if (!category) {
      alert("Please select a category")
      return
    }

    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          description,
          category
        })
      })
      if (response.ok) {
        setIsDialogOpen(false)
        if (amountRef.current) amountRef.current.value = ""
        if (descriptionRef.current) descriptionRef.current.value = ""
        if (categoryRef.current) categoryRef.current.value = ""
        fetchExpenses() // Refresh the list
      } else {
        alert("Error adding expense")
      }
    } catch (error) {
      console.error("Error adding expense:", error)
      alert("Error adding expense")
    }
  }

  const AddExpenseDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <DollarSign className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Enter the details of your expense below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              ref={amountRef}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              ref={descriptionRef}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              ref={categoryRef}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full">
            Add Expense
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
  // Calculate stats
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const monthlySpending = expenses
    .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0)
  const averageDaily = expenses.length > 0 ? totalExpenses / 30 : 0 // rough estimate

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          change={`${expenses.length} expenses recorded`}
          changeType="neutral"
          icon={DollarSign}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Monthly Spending"
          value={`$${monthlySpending.toFixed(2)}`}
          change="Current month"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          title="Average Daily Spend"
          value={averageDaily > 0 ? `$${averageDaily.toFixed(2)}` : "—"}
          change="Based on total expenses"
          changeType="neutral"
          icon={Calendar}
          iconColor="bg-amber-500/10 text-amber-500"
        />
        <StatCard
          title="Savings"
          value="$0.00"
          change="Feature coming soon"
          changeType="neutral"
          icon={PiggyBank}
          iconColor="bg-emerald-500/10 text-emerald-500"
        />
      </div>

      {/* Recent Transactions */}
      <TransactionTable expenses={expenses} onAddExpense={() => setIsDialogOpen(true)} />
      <AddExpenseDialog />
    </div>
  )
}
