import { ThemeProvider } from "@/components/theme-provider"
import { GlobalHeader } from "@/components/GlobalHeader"

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <GlobalHeader />
            {children}
        </ThemeProvider>
    )
}
