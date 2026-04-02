# Hangseong Design System: Standardized Header Guidelines

To maintain a consistent and premium look across all catalog pages, the following header style must be strictly applied to every sub-page.

## 1. Header Structure & Alignment
All page headers must be **center-aligned**.

## 2. Typography Specifications
- **Main Title (H1)**:
  - Font Size: `text-3xl` (Mobile) / `text-5xl` (Desktop)
  - Font Weight: `font-black` (Extra bold)
  - Color: `dark:text-white text-slate-900`
  - Spacing: `mb-4` (Bottom margin), `tracking-tight`
- **Subtitle (P)**:
  - Font Size: `text-base` (Mobile) / `text-lg` (Desktop)
  - Color: `dark:text-slate-400 text-slate-600`
  - Layout: `max-w-3xl mx-auto` (Centered width)

## 3. Top Margin / Padding
- The header should be placed within a container with consistent padding, typically `py-12` or similar, to ensure breathing room from the top navigation/sidebar.

## 4. Example Code Snippet (Tailwind CSS)
```tsx
<div className="mb-12 text-center">
    <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
    >
        Page Title
    </motion.h1>
    <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
    >
        Brief descriptive subtitle explaining the content of this page.
    </motion.p>
</div>
```

## 5. Prohibited Styles (Anti-Patterns)
- Do not use oversized headings (e.g., `text-8xl`).
- Do not use left-aligned headings on sub-pages.
- Do not use excessive gradients on the main title that distract from readability (subtle gradients are okay for secondary sections).
- Do not use varying margins for headers between different sub-pages.
