import { create } from 'zustand'

type State = {
    isSideMenuOpen: boolean

    openSideMenu: () => void
    closeSideMenu: () => void
}

export const useUIStore = create<State>()((set) => (
    {
        isSideMenuOpen: true,

        openSideMenu: () => set({ isSideMenuOpen: true }),
        closeSideMenu: () => set({ isSideMenuOpen: false })
    }
))