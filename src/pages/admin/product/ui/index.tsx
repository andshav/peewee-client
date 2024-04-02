import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AdminProduct } from '@/widgets/admin/product/ui';
import { useProduct } from '@/widgets/product/model/product';

export const AdminProductPage: FC = () => {
    const { article } = useParams();
    const { product, getOne } = useProduct();
    useEffect(() => {
        if (article && article !== 'create') {
            getOne(+article);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (article !== 'create' && product?.article.toString() !== article) return null;

    return <AdminProduct product={product} />;
};
