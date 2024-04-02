import { create } from 'zustand';

import { apiCategory } from '@/shared/api/category';
import { Category } from '@/shared/types/category';

interface CategoryState {
    categories: Category[] | null;
    // getOne: (article: number) => void;
    getAll: () => void;
    create: (name: string) => Promise<void>;
    update: (category: Category) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

export const useCategory = create<CategoryState>((set) => ({
    categories: null,
    // getOne: (name: number) => {
    //     apiProduct.getOne(article).then((product) => set((state) => ({
    //         ...state,
    //         product,
    //     })));
    // },
    getAll() {
        apiCategory.getAll().then((categories) => set((state) => ({
            ...state,
            categories,
        })));
    },
    async create(name) {
        await apiCategory.create(name);
    },
    async update(category) {
        await apiCategory.update(category);
    },
    async delete(id) {
        await apiCategory.delete(id);
    },
}));
