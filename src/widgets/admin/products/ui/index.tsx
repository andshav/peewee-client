import { Button, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '@/entities/product-card';
import { STATIC_URL } from '@/shared/api';
import { Product } from '@/shared/types/product';

interface Props {
    products: Product[];
}

export const AdminProducts: FC<Props> = ({ products }) => {
	const navigate = useNavigate();
	return (
		<div className="grid grid-cols-2 md:grid-cols-6 gap-2 px-2">
			{products.map((product) => (
				<ProductCard
					key={product.article}
					title={product.product_name.name}
					price={product.price}
					path={`${product.article}`}
					mainImg={`${STATIC_URL}/${product.images[0].src}`}
					hoverImageList={product.images.length > 1 ? product.images.slice(1).map(({ src }) => `${STATIC_URL}/${src}`) : []}
				/>
			))}
			<Button
				variant="outlined"
				color="inherit"
				className="w-full h-full"
				onClick={() => navigate('create')}
			>
				<AiOutlinePlus className="w-8 h-8" />
			</Button>
		</div>
	);
};
