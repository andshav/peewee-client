import { FC, useEffect } from 'react';
import { ProductCard } from '@/entities/product-card';
import { STATIC_URL } from '@/shared/api';
import { useCatalog } from '../model';

export const Catalog: FC = () => {
  const { products = [], getProducts } = useCatalog();

  useEffect(() => {
	if (!products) {
		getProducts();
	}
  }, [products]);

  if (products === null) return null;

  return (
	<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
		{products.map((product) => (
			<ProductCard
				key={product.article}
				title={product.product_name.name}
				price={product.price}
				path={`/product/${product.article}`}
				mainImg={`${STATIC_URL}/${product.images[0].src}`}
				hoverImageList={product.images.length > 1 ? product.images.slice(1).map(({ src }) => `${STATIC_URL}/${src}`) : []}
			/>
		))}
	</div>
  );
};
