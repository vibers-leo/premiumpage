interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeader({ label, title, description, align = 'left', dark }: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}`}>
      <div className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-4 flex items-center gap-3 ${dark ? 'text-neutral-500' : 'text-neutral-400'} ${centered ? 'justify-center' : ''}`}>
        <div className={`w-8 h-px ${dark ? 'bg-neutral-700' : 'bg-neutral-300'}`} />
        {label}
      </div>
      <h2 className={`text-2xl md:text-4xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
