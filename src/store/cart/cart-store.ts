import { ProductInCart } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: ProductInCart[];

    addToCart: (product: ProductInCart) => void;
    getTotalItems: () => number;
    updateProductQuantity: (product: ProductInCart, quantity: number) => void;
    removeFromCart: (product: ProductInCart) => void;
    getSummaryInformation: () => { itemsInCart: number; subTotal: number; tax: number; total: number };

    clearCart: () => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart(product: ProductInCart) {
                const { cart } = get();
                const existingProductIndex = cart.findIndex(p => p.id === product.id && p.size === product.size);

                if (existingProductIndex === -1) {
                    set({ cart: [...cart, product] });
                } else {
                    cart[existingProductIndex].quantity += product.quantity;
                    set({ cart });
                }
            },

            getTotalItems() {
                const { cart } = get();
                return cart.reduce((acc, p) => acc + p.quantity, 0);
            },

            updateProductQuantity(product, quantity) {
                const { cart } = get();

                const updatedCart = cart.map(p => {
                    if (p.id === product.id && p.size === product.size) return { ...p, quantity };
                    return p;
                });

                set({ cart: updatedCart });
            },

            removeFromCart(product) {
                const { cart } = get();
                const updatedCart = cart.filter(p => !(p.id === product.id && p.size === product.size));
                set({ cart: updatedCart });
            },

            getSummaryInformation() {
                const { cart } = get();
                const { itemsInCart, subTotal } = cart.reduce((acc, p) => {
                    acc.itemsInCart += p.quantity;
                    acc.subTotal += p.quantity * p.price;
                    return acc;
                }, { itemsInCart: 0, subTotal: 0 });

                const tax = subTotal * 0.15;
                const total = subTotal + tax;

                return { itemsInCart, subTotal, tax, total };
            },

            clearCart() {
                set({ cart: [] });
            }
        }),
        {
            name: 'shopping-cart',
        }
    )
)