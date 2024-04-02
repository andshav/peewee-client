import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '@/widgets/product';

export const ProductPage = () => {
    const params = useParams();
    const article = useMemo(() => {
        const { article } = params;
            if (typeof article === 'string') {
                return parseInt(article, 10);
            }
        return undefined;
    }, [params]);

    if (!article) {
        return null;
    }
	return (
		<Product article={article} />
    );
};
