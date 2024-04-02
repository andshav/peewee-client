import { create } from 'zustand';

import { apiMaterial } from '@/shared/api/material';
import { Material } from '@/shared/types/material';

interface MaterialState {
    materials: Material[] | null;
    // getOne: (article: number) => void;
    getAll: () => void;
    create: (name: string) => Promise<void>;
    update: (category: Material) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

export const useMaterial = create<MaterialState>((set) => ({
    materials: null,
    // getOne: (name: number) => {
    //     apiProduct.getOne(article).then((product) => set((state) => ({
    //         ...state,
    //         product,
    //     })));
    // },
    getAll() {
        apiMaterial.getAll().then((materials) => set((state) => ({
            ...state,
            materials,
        })));
    },
    async create(name) {
        await apiMaterial.create(name);
    },
    async update(category) {
        await apiMaterial.update(category);
    },
    async delete(id) {
        await apiMaterial.delete(id);
    },
}));
