import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTabs = create(
    persist(
        (set) => ({
            
            // Estado incial
            activeTab: 0,

            //Acciones
            setActiveTab: (tabNumber) => set({activeTab: tabNumber}) 
        }),
        {
            name: "tabs-navigation-store"
        }
    )
)

export default useTabs