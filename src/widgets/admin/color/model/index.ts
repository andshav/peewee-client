import { create } from 'zustand';

import { apiColor } from '@/shared/api/color';
import { Color } from '@/shared/types/color';

interface ColorState {
    colors: Color[] | null;
    // getOne: (article: number) => void;
    getAll: () => void;
    create: (category: Omit<Color, 'id'>) => Promise<void>;
    update: (category: Color) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

export const useColor = create<ColorState>((set) => ({
    colors: null,
    // getOne: (name: number) => {
    //     apiProduct.getOne(article).then((product) => set((state) => ({
    //         ...state,
    //         product,
    //     })));
    // },
    getAll() {
        apiColor.getAll().then((colors) => set((state) => ({
            ...state,
            colors,
        })));
    },
    async create(category) {
        await apiColor.create(category);
    },
    async update(color) {
        await apiColor.update(color);
    },
    async delete(id) {
        await apiColor.delete(id);
    },
}));
