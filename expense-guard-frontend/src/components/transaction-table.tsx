import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Receipt, Plus } from "lucide-react"

interface Transaction {
  id: number
  date: string
  category: string
  description: string
  amount: number
}

interface TransactionTableProps {
  expenses?: Transaction[]
  onAddExpense?: () => void
}

export function TransactionTable({ expenses = [], onAddExpense }: TransactionTableProps) {
  const transactions = expenses.map(e => ({
    ...e,
    id: e.id.toString(),
    category: e.category as any
  }))

  const getCategoryStyle = (category: string) => {
    const styles = {
      Food: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Travel: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Bills: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      Shopping: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      Entertainment: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      Health: "bg-red-500/10 text-red-500 border-red-500/20",
      Education: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      Other: "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
    return styles[category as keyof typeof styles] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }

  if (transactions.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-card-foreground">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Receipt className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No transactions yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Your recent expenses will appear here once you add them.
            </p>
            <Button className="gap-2" onClick={onAddExpense}>
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-card-foreground">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Description</TableHead>
                <TableHead className="text-right text-muted-foreground">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-border transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium text-card-foreground">{transaction.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("border font-medium", getCategoryStyle(transaction.category))}>
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{transaction.description}</TableCell>
                  <TableCell className="text-right font-mono font-medium text-card-foreground">
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
