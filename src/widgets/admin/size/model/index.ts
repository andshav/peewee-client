import { create } from 'zustand';

import { apiSize } from '@/shared/api/size';
import { Size } from '@/shared/types/size';

interface SizeState {
    sizes: Size[] | null;
    // getOne: (article: number) => void;
    getAll: () => void;
    create: (size: Omit<Size, 'id'>) => Promise<void>;
    update: (size: Size) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

export const useSize = create<SizeState>((set) => ({
    sizes: null,
    // getOne: (name: number) => {
    //     apiProduct.getOne(article).then((product) => set((state) => ({
    //         ...state,
    //         product,
    //     })));
    // },
    getAll() {
        apiSize.getAll().then((sizes) => set((state) => ({
            ...state,
            sizes,
        })));
    },
    async create(size) {
        await apiSize.create(size);
    },
    async update(size) {
        await apiSize.update(size);
    },
    async delete(id) {
        await apiSize.delete(id);
    },
}));
