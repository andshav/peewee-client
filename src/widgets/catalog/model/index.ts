import { create } from 'zustand';
import { apiProduct } from '@/shared/api/product';
import { Product } from '@/shared/types/product';

interface CatalogState {
    products: Product[] | null;
    getProducts: () => void;
    resetProducts: () => void;
}

export const useCatalog = create<CatalogState>((set) => ({
    products: null,
    getProducts: () => {
        apiProduct.getAll().then((products) => set((state) => ({
            ...state,
            products,
        })));
    },
    resetProducts: () => {
        set((state) => ({ ...state, products: null }));
    },
}));
