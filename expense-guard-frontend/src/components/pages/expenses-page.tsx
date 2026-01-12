import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Receipt } from "lucide-react"

interface Expense {
  id: number
  amount: number
  description: string
  category: string
  date: string
}

export function ExpensesPage() {
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
          <Plus className="mr-2 h-4 w-4" />
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">All Expenses</h2>
          <p className="text-muted-foreground">Manage and track all your expenses</p>
        </div>
        <AddExpenseDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
          <CardDescription>View and manage your recorded expenses</CardDescription>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Receipt className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">No expenses recorded</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start tracking your spending by adding your first expense
              </p>
              <AddExpenseDialog />
            </div>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-mono font-semibold">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
