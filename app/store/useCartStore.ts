import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            addItem: (item) => set((state) => {
                const existing = state.cart.find((i) => i.id === item.id);
                if (existing) {
                    return {
                        cart: state.cart.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                        isOpen: true, // Open cart when adding
                    };
                }
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }],
                    isOpen: true
                };
            }),
            removeItem: (id) => set((state) => ({
                cart: state.cart.filter((i) => i.id !== id),
            })),
        }),
        { name: 'gauge-cart' }
    )
);