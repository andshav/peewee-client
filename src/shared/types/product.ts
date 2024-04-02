export interface Product {
    article: number;
    product_name: {
        id: number;
        name: string;
        desc: string;
        category: {
            name: string
            id: number;
        };
        materials: {
            id: number;
            name: string;
            product_material: {
                percentage: number
            }
        }[];
        infos: {
            title: string;
            desc: string;
        }[];
    };
    price: number;
    createdAt: string;
    updatedAt: string;
    color: {
        name: string;
        code: string;
        id: number;
    };
    images: {
        src: string;
    }[];
    sizes: {
        id: number;
        name: string | null;
        min: number;
        max: number;
        product_size: {
            count: number | null;
        }
    }[];
}
