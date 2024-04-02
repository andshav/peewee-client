import { FC, useEffect } from 'react';
import { AdminProducts } from '@/widgets/admin/products/ui';
import { useCatalog } from '@/widgets/catalog/model';

export const AdminProductsPage: FC = () => {
    const { products, getProducts, resetProducts } = useCatalog();
    useEffect(() => {
        if (products === null) {
            getProducts();
        }
        return () => resetProducts();
    }, []);

    if (products === null) {
        return null;
    }
    console.log({ products });

    return <AdminProducts products={products} />;
};
