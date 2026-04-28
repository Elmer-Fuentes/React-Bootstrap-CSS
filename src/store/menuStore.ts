import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type product = {
  id: number,
  name: string,
  description: string,
  price: number,
  image: string
}

type ProductState = {
  products: product[]
  setProducts: (products: product[]) => void
  removeProduct: (product: product) => void
  addProduct: (product: product) => void
}

export const useProductStore = create<ProductState>()(
  devtools(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }, false, 'setProducts'),
      removeProduct: (product) => set((state) => ({ 
        products: state.products.filter((p) => p.id !== product.id) 
      }), false, 'removeProduct'),
      addProduct: (product) => set((state) => ({ 
        products: [...state.products, product] 
      }), false, 'addProduct')
    }),
    { name: 'product-store' }
  )
)