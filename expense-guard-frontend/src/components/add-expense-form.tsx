import { useState } from "react";
import { addExpense } from "@/lib/api";

export default function AddExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addExpense({ title, amount, category: "General" });
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}
