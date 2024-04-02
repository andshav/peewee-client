import { create } from 'zustand';
import { apiProduct } from '@/shared/api/product';
import { Product } from '@/shared/types/product';

interface ProductState {
    product: Product | null;
    productsByName: Product[] | null;
    getOne: (article: number) => void;
    getAllByName: (productNameId: number) => void;
    clearProduct: () => void;
}

export const useProduct = create<ProductState>((set) => ({
    product: null,
    productsByName: null,
    getOne: (article: number) => {
        apiProduct.getOne(article).then((product) => set((state) => ({
            ...state,
            product,
        })));
    },
    getAllByName: (productNameId: number) => {
        apiProduct.getAllByName(productNameId).then((products) => set((state) => ({
            ...state,
            productsByName: products,
        })));
    },
    clearProduct: () => set((state) => ({
        ...state,
        product: null,
    })),
}));
