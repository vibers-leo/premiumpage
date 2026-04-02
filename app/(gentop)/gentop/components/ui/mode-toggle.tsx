
"use client"

import * as React from "react"
import { Moon, Sun, Languages } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const currentLang = pathname.split("/")[1] || "en"
    const nextLang = currentLang === "en" ? "ko" : "en"

    const toggleLanguage = () => {
        const segments = pathname.split("/")
        segments[1] = nextLang
        router.push(segments.join("/"))
    }

    return (
        <div className="flex items-center gap-2 dark:bg-neutral-900/50 bg-neutral-100/50 backdrop-blur-md border dark:border-white/10 border-black/10 p-1 rounded-full px-3">
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 hover:dark:bg-white/10 hover:bg-black/5 rounded-full transition-colors dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black"
                title="Toggle theme"
            >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="w-[1px] h-4 dark:bg-white/10 bg-black/10" />

            <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 p-1.5 hover:dark:bg-white/10 hover:bg-black/5 rounded-full transition-colors dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black text-xs font-bold"
                title="Change language"
            >
                <Languages size={18} />
                <span className="uppercase">{currentLang === "en" ? "KR" : "EN"}</span>
            </button>
        </div>
    )
}
