import { LoadingButton } from '@mui/lab';
import { Button, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import heic2any from 'heic2any';
import { FC, useCallback, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { BsTrash } from 'react-icons/bs';
import { STATIC_URL } from '@/shared/api';
import { apiProduct } from '@/shared/api/product';
import { getConvertedImageUrl } from '../helpers';
import { CategoryField } from './category-field';
import { ColorField } from './color-field';
import { ImagesField } from './images-field';
import { InfoField } from './info-fieid';
import { MaterialsField } from './materials-field';
import { SizesField } from './sizes-field';
import { AdminProductProps, ProductBody } from './types';

export const AdminProduct: FC<AdminProductProps> = ({ product }) => {
	const [loading, setLoading] = useState(false);

	const [body, setBody] = useState<ProductBody>({
		article: '',
		name: '',
		categoryId: null,
		desc: '',
		price: 0,
		colorId: null,
		materials: [],
		sizes: [],
		images: [],
		infos: [],
	});

	const resetBody = useCallback(() => {
		if (product) {
			setBody({
				article: product.article.toString(),
				name: product.product_name.name,
				categoryId: product.product_name.category.id,
				desc: product.product_name.desc,
				price: product.price,
				colorId: product.color.id,
				materials: product.product_name.materials.map((mat) => ({
					id: mat.id,
					percentage: mat.product_material.percentage,
				})),
				sizes: product.sizes.map((size) => ({
					id: size.id,
					count: size.product_size.count || 0,
				})),
				images: product.images.map(({ src }) => ({ name: src, blob: `${STATIC_URL}/${src}` })),
				infos: product.product_name.infos,
			});
		}
	}, [product]);

	useEffect(() => {
		if (product) {
			resetBody();
		}
	}, [product, resetBody]);

	const changeHandler = (fieldName: keyof ProductBody) => (value: unknown) => {
		setBody((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	return (
		<div className="flex flex-col gap-4 items-start">
			<Paper className="p-4 w-full flex flex-col gap-4 items-start !rounded-xl" elevation={4}>
				<Typography variant="h6">Основные</Typography>
				<div className="flex flex-col md:flex-row gap-4 md:justify-between w-full items-start">
					{body.images[0] ? (
						<div className="flex flex-col gap-2">
							<img
								className="h-auto w-full md:w-72"
								src={body.images[0].blob}
								alt=""
								onError={() => {
									changeHandler('images')(body.images.slice(1));
								}}
							/>
							<Button
								variant="outlined"
								component="label"
								color="inherit"
								fullWidth
							>
								<Typography>Изменить фото</Typography>
								<input
									accept="image/*"
									type="file"
									hidden
									onChange={async (e) => {
										const image = e.target.files?.[0];

										if (image) {
											const newState = [...body.images];
											const imgUrl = await getConvertedImageUrl(image);
											newState[0] = {
												name: image.name,
												blob: imgUrl,
											};
											changeHandler('images')(newState);
										}
									}}
								/>
							</Button>
						</div>
					) : (
						<Button
							variant="outlined"
							className="h-80 md:h-56 w-full md:w-56 flex flex-col"
							component="label"
							color="inherit"
						>
							<AiOutlinePlus className="w-8 h-8" />
							<Typography>Добавить фото</Typography>
							<input
								accept="image/*"
								type="file"
								hidden
								onChange={async (e) => {
									const newState = [...body.images];
									const image = e.target.files?.[0];

									if (image) {
										const imgUrl = await getConvertedImageUrl(image);
										newState[0] = {
											name: image.name,
											blob: imgUrl,
										};
										changeHandler('images')(newState);
									}
								}}
							/>
						</Button>
					)}
					<div className="flex flex-grow flex-col gap-4 items-start w-full">
						<TextField
							fullWidth
							size="small"
							label="Артикул"
							value={body.article}
							onChange={({ target: { value } }) => changeHandler('article')(value)}
							disabled={Boolean(product)}
						/>
						<TextField
							fullWidth
							size="small"
							label="Название"
							value={body.name}
							onChange={({ target: { value } }) => changeHandler('name')(value)}
						/>
						<TextField
							size="small"
							multiline
							maxRows={10}
							fullWidth
							label="Описание"
							value={body.desc}
							onChange={({ target: { value } }) => changeHandler('desc')(value)}
						/>
						<div className="w-full flex flex-col md:flex-row justify-between gap-4">
							<div className="flex flex-col md:flex-row gap-4 md:gap-8">
								<CategoryField
									product={product}
									value={body.categoryId}
									onChange={changeHandler('categoryId')}
								/>
								<ColorField
									product={product}
									value={body.colorId}
									onChange={changeHandler('colorId')}
								/>
							</div>
							<TextField
								type="number"
								className="w-40 self-end "
								value={body.price}
								onChange={({ target: { value } }) => changeHandler('price')(value)}
								InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Typography variant="h6">RUB</Typography>
									</InputAdornment>
									),
									className: '!text-2xl',
								}}
							/>
						</div>
					</div>
				</div>

			</Paper>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
				<Paper className="p-4 w-full md:w-auto !rounded-xl" elevation={4}>
					<MaterialsField
						product={product}
						value={body.materials}
						onChange={changeHandler('materials')}
					/>
				</Paper>

				<Paper className="p-4 w-full md:w-auto !rounded-xl" elevation={4}>
					<SizesField
						product={product}
						value={body.sizes}
						onChange={changeHandler('sizes')}
					/>
				</Paper>
			</div>
			<Paper className="p-4 w-full !rounded-xl" elevation={4}>
				<ImagesField
					product={product}
					value={body.images.slice(1)}
					onChange={(newImages) => changeHandler('images')([
						body.images[0], ...newImages,
					])}
				/>
			</Paper>
			<Paper className="p-4 w-full !rounded-xl" elevation={4}>
				<InfoField
					product={product}
					value={body.infos}
					onChange={changeHandler('infos')}
				/>
			</Paper>
			<Paper className={`p-4 w-full sticky bottom-0 z-10 flex justify-${product ? 'between' : 'end'} gap-4 !rounded-xl`} elevation={4}>
				{product && (
					<Button
						startIcon={<BsTrash />}
						color="error"
						onClick={() => {
							apiProduct.delete(body.article).then(() => {
								window.open('/admin/products', '_self');
							});
						}}
					>
						Удалить
					</Button>
				)}
				<div className="flex gap-2 justify-end">
					<Button
						className="self-end"
						variant="contained"
						color="inherit"
						onClick={resetBody}
					>
						Сброс
					</Button>
					<LoadingButton
						loading={loading}
						className="self-end"
						variant="contained"
						onClick={async () => {
						setLoading(true);
						(product ? apiProduct.update(body) : apiProduct.create(body))
							.then(() => {
								window.open('/admin/products', '_self');
							})
							.finally(() => {
								setLoading(false);
							});
					}}
					>
						{product ? 'Редактировать' : 'Создать'}
					</LoadingButton>
				</div>
			</Paper>
		</div>
	);
};
