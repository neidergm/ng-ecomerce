import { UserAddressFormFields } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    address?: UserAddressFormFields

    setAddress: (address: State["address"]) => void
}

export const userAddressStore = create<State>()(
    persist(
        (set) => ({
            address: undefined,

            setAddress: (address) => set({ address }),
        }),
        {
            name: 'user-address',
        }
    )
)
