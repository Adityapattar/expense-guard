import React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import MainApp from "./MainApp"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MainApp />
    </ThemeProvider>
  )
}

export default App