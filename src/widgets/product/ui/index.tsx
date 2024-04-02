import { Breadcrumbs, Button, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { AiFillHeart, AiFillHome, AiOutlineHeart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

import { paths } from '@/shared/routing';
import { useProduct } from '../model/product';
import { ColorSelectItem } from './color-select-item';
import { ProductGallery } from './gallery';

interface ProductProps {
	article: number
}

export const Product: FC<ProductProps> = ({ article }) => {
	const {
		product,
		productsByName,
		getOne,
		getAllByName,
		clearProduct,
	} = useProduct();

	const navigate = useNavigate();

	const [selectedSize, setSelectedSize] = useState<number>();
	const [_fav, setFav] = useState(false);

	useEffect(() => {
		getOne(article);
		setSelectedSize(undefined);
		return () => clearProduct();
	}, [article, clearProduct, getOne]);

	useEffect(() => {
		if (product?.product_name && productsByName === null) {
			getAllByName(product.product_name.id);
		}
	}, [getAllByName, product, productsByName]);

	const outOfStock = useMemo(
		() => product?.sizes.reduce((prev, { product_size: { count } }) => prev + (count || 0), 0) === 0,
		[product],
	);

	const buttonText = useMemo(() => {
		if (outOfStock) return 'Нет в наличии';
		if (selectedSize === undefined) return 'Выберете размер';
		return 'Добавить в корзину';
	}, [outOfStock, selectedSize]);

	if (product === null || productsByName === null) {
		return null;
	}

	return (
		<div className="flex flex-col gap-6">
			<Breadcrumbs className="px-4 md:px-8">
				<Link className="hover:text-black cursor-pointer" to={paths.home}>
					<AiFillHome />
				</Link>
				<Link className="hover:text-black cursor-pointer" to={paths.catalog}>
					<Typography>
						{product.product_name.category.name.toLocaleLowerCase()}
					</Typography>
				</Link>
			</Breadcrumbs>
			<div className="flex flex-col md:flex-row gap-8 md:px-8">
				<div className="max-w-2xl">
					<ProductGallery product={product} />
				</div>
				<div className="flex flex-col gap-6 md:items-start md:w-[50%] px-4">
					<div className="flex flex-col gap-0">
						<Typography variant="h6">{product.product_name.name}</Typography>
						<Typography className="text-gray-600">{product.product_name.category.name}</Typography>
					</div>
					<Typography variant="h6">{product.price.toLocaleString()} RUB</Typography>

					<Select
						variant="outlined"
						size="small"
						value={product.article}
						renderValue={() => (
							<ColorSelectItem {...product.color} />
						)}
						onChange={({ target: { value } }) => navigate(`/product/${value}`)}
					>
						{productsByName.map(({ color, article }) => (
							<MenuItem key={article} value={article}>
								<ColorSelectItem {...color} />
							</MenuItem>
						))}
					</Select>

					<div className="grid md:flex flex-wrap grid-cols-4 gap-2">
						{
							product.sizes.map(({ id, name, min, max, product_size: { count } }) => {
								let sizeName = name;
								if (!sizeName) {
									if (min === max) {
										sizeName = min.toString();
									} else {
										sizeName = `${min}-${max}`;
									}
								}
								return (
									<Button
										onClick={() => setSelectedSize(id)}
										size="small"
										variant={selectedSize === id ? 'contained' : 'outlined'}
										key={sizeName}
										color={selectedSize === id ? 'primary' : 'inherit'}
										disabled={!count}
									>
										{sizeName}
									</Button>
								);
							})
						}
					</div>
					<div className="flex items-center gap-2 w-full">
						<Button
							className="flex-grow"
							disabled={selectedSize === undefined || outOfStock}
							variant="contained"
						>
							{buttonText}
						</Button>
						<IconButton
							onClick={() => setFav((prev) => !prev)}
							color={_fav ? 'primary' : 'inherit'}
						>
							{_fav ? <AiFillHeart /> : <AiOutlineHeart />}
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};
