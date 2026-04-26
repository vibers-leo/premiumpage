import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { MainLayout } from "@/components/MainLayout"

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Toaster position="top-center" richColors />
      <MainLayout>
        {children}
      </MainLayout>
    </ThemeProvider>
  )
}
