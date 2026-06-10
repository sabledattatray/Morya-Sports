import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
  giftWrap: boolean;
}

export interface LoyaltyHistoryEntry {
  date: string;
  description: string;
  points: number; // positive = earned, negative = redeemed
}

interface CartStore {
  cart: CartItem[];
  wishlist: Product[];
  loyaltyPoints: number;
  loyaltyHistory: LoyaltyHistoryEntry[];
  referralCode: string;
  addToCart: (product: Product, quantity?: number, giftWrap?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleGiftWrap: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addLoyaltyPoints: (points: number, description: string) => void;
  redeemLoyaltyPoints: (points: number) => boolean; // returns false if insufficient
}

// Generate a unique referral code for the user
function generateReferralCode(): string {
  return 'MS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      loyaltyPoints: 120, // Start with some demo points
      loyaltyHistory: [
        { date: 'May 12, 2026', description: 'Order MS-482910 completed', points: 250 },
        { date: 'April 02, 2026', description: 'Order MS-103948 completed', points: 100 },
        { date: 'March 20, 2026', description: 'Google Review bonus', points: 50 },
        { date: 'March 10, 2026', description: 'Welcome bonus', points: 50 },
        { date: 'March 10, 2026', description: 'Redeemed at checkout', points: -330 },
      ],
      referralCode: generateReferralCode(),

      addToCart: (product, quantity = 1, giftWrap = false) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.product.id === product.id);

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          set({
            cart: cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, quantity, giftWrap }] });
        }
      },

      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          set({ cart: cart.filter((item) => item.product.id !== productId) });
        } else {
          set({
            cart: cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          });
        }
      },

      toggleGiftWrap: (productId) => {
        const { cart } = get();
        set({
          cart: cart.map((item) =>
            item.product.id === productId ? { ...item, giftWrap: !item.giftWrap } : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (product) => {
        const { wishlist } = get();
        const exists = wishlist.some((item) => item.id === product.id);

        if (exists) {
          set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
      },

      addLoyaltyPoints: (points, description) => {
        const { loyaltyPoints, loyaltyHistory } = get();
        const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        set({
          loyaltyPoints: loyaltyPoints + points,
          loyaltyHistory: [{ date: today, description, points }, ...loyaltyHistory],
        });
      },

      redeemLoyaltyPoints: (points) => {
        const { loyaltyPoints, loyaltyHistory } = get();
        if (loyaltyPoints < points) return false;
        const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        set({
          loyaltyPoints: loyaltyPoints - points,
          loyaltyHistory: [{ date: today, description: 'Redeemed at checkout', points: -points }, ...loyaltyHistory],
        });
        return true;
      },
    }),
    {
      name: 'morya-sports-storage',
    }
  )
);
