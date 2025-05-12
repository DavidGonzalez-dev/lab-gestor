import { create } from "zustand"
import { persist } from "zustand/middleware"

const useSidebar = create(
    persist(
        (set) => ({
            // Estado incicial
            isCollapsed: false,

            //Acciones
            toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),

            collapsedSidebar: () => set({ isCollapsed: true }),

            expandSidebar: () => set({ isCollapsed: false })
        }),
        {
            name: "sidebar-storage"
        }
    )
)

export default useSidebar