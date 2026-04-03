import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/components/MainLayout"

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <MainLayout>
                {children}
            </MainLayout>
        </ThemeProvider>
    )
}
