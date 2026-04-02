import { create } from 'zustand'

export interface BuilderComponent {
    id: string
    type: 'text' | 'image' | 'button' | 'section' | 'card' | 'header' | 'footer' | 'gallery' | 'input' | 'container'
    content: string
    styles: {
        fontSize?: string
        color?: string
        backgroundColor?: string
        padding?: string
        margin?: string
        textAlign?: 'left' | 'center' | 'right'
        width?: string
        height?: string
        display?: string
        flexDirection?: 'row' | 'column'
        gap?: string
        justifyContent?: string
        alignItems?: string
    }
    props?: {
        href?: string
        src?: string
        alt?: string
        placeholder?: string
        images?: string[]
        columns?: number
    }
    children?: BuilderComponent[]
}

interface BuilderState {
    components: BuilderComponent[]
    selectedComponent: string | null
    history: BuilderComponent[][]
    historyIndex: number
    addComponent: (component: BuilderComponent) => void
    removeComponent: (id: string) => void
    updateComponent: (id: string, updates: Partial<BuilderComponent>) => void
    selectComponent: (id: string | null) => void
    reorderComponents: (startIndex: number, endIndex: number) => void
    clearAll: () => void
    loadComponents: (components: BuilderComponent[]) => void
    undo: () => void
    redo: () => void
    canUndo: () => boolean
    canRedo: () => boolean
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
    components: [],
    selectedComponent: null,
    history: [[]],
    historyIndex: 0,

    addComponent: (component) =>
        set((state) => {
            const newComponents = [...state.components, component]
            const newHistory = state.history.slice(0, state.historyIndex + 1)
            newHistory.push(newComponents)
            return {
                components: newComponents,
                history: newHistory,
                historyIndex: newHistory.length - 1
            }
        }),

    removeComponent: (id) =>
        set((state) => {
            const newComponents = state.components.filter((c) => c.id !== id)
            const newHistory = state.history.slice(0, state.historyIndex + 1)
            newHistory.push(newComponents)
            return {
                components: newComponents,
                selectedComponent: state.selectedComponent === id ? null : state.selectedComponent,
                history: newHistory,
                historyIndex: newHistory.length - 1
            }
        }),

    updateComponent: (id, updates) =>
        set((state) => {
            const newComponents = state.components.map((c) =>
                c.id === id ? { ...c, ...updates } : c
            )
            const newHistory = state.history.slice(0, state.historyIndex + 1)
            newHistory.push(newComponents)
            return {
                components: newComponents,
                history: newHistory,
                historyIndex: newHistory.length - 1
            }
        }),

    selectComponent: (id) =>
        set({ selectedComponent: id }),

    reorderComponents: (startIndex, endIndex) =>
        set((state) => {
            const result = Array.from(state.components)
            const [removed] = result.splice(startIndex, 1)
            result.splice(endIndex, 0, removed)
            const newHistory = state.history.slice(0, state.historyIndex + 1)
            newHistory.push(result)
            return {
                components: result,
                history: newHistory,
                historyIndex: newHistory.length - 1
            }
        }),

    clearAll: () =>
        set({
            components: [],
            selectedComponent: null,
            history: [[]],
            historyIndex: 0
        }),

    loadComponents: (components) =>
        set({
            components,
            selectedComponent: null,
            history: [components],
            historyIndex: 0
        }),

    undo: () =>
        set((state) => {
            if (state.historyIndex > 0) {
                const newIndex = state.historyIndex - 1
                return {
                    components: state.history[newIndex],
                    historyIndex: newIndex
                }
            }
            return state
        }),

    redo: () =>
        set((state) => {
            if (state.historyIndex < state.history.length - 1) {
                const newIndex = state.historyIndex + 1
                return {
                    components: state.history[newIndex],
                    historyIndex: newIndex
                }
            }
            return state
        }),

    canUndo: () => get().historyIndex > 0,
    canRedo: () => get().historyIndex < get().history.length - 1
}))
