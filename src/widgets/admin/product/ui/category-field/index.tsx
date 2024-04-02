import { Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { AiOutlineClose, AiOutlineSetting } from 'react-icons/ai';

import { AdminCategory } from '@/widgets/admin/category/ui';
import { apiCategory } from '@/shared/api/category';
import { Category } from '@/shared/types/category';
import { FieldProps, Option } from '../types';

export const CategoryField: FC<FieldProps<number | null>> = ({
	product,
	value,
	onChange,
}) => {
	const [showAdminCategory, setShowAdminCategory] = useState(false);

	const [options, setOptions] = useState<null | Option<number, Category>[]>(null);

	const updateOptions = useCallback(() => {
		apiCategory.getAll()
			.then((res) => setOptions(
				(res || []).map((item) => ({
					label: item.name,
					value: item.id,
					data: item,
				})),
			));
	}, []);

	const closeAdminCategory = () => {
		setShowAdminCategory(false);
		updateOptions();
	};
	return (
		<div className="flex gap-1 items-center justify-between md:justify-start w-full">
			<FormControl size="small" fullWidth>
				<InputLabel id="category">Категория</InputLabel>
				<Select
					className="min-w-[164px]"
					size="small"
					labelId="category"
					value={value || ''}
					label="Категория"
					// @ts-ignore
					onChange={({ target: { value } }) => onChange(value)}
					onOpen={() => {
						if (options) return;
						updateOptions();
					}}
				>
					{
						options === null && product && (
							<MenuItem
								value={product.product_name.category.id}
							>
								{product.product_name.category.name}
							</MenuItem>
						)
					}
					{
						options !== null && options.map(({ value, label }) => (
							<MenuItem key={value} value={value}>{label}</MenuItem>
						))
					}
				</Select>
			</FormControl>
			<IconButton
				size="small"
				onClick={() => setShowAdminCategory(true)}
			>
				<AiOutlineSetting />
			</IconButton>
			<Dialog
				open={showAdminCategory}
				onClose={closeAdminCategory}
			>
				<DialogTitle className="my-8">
					<div className="flex items-center gap-4 justify-between">
						Управление категориями
						<IconButton
							aria-label="close"
							onClick={closeAdminCategory}
						>
							<AiOutlineClose />
						</IconButton>
					</div>
				</DialogTitle>
				<DialogContent>
					<AdminCategory />
				</DialogContent>
			</Dialog>
		</div>
	);
};
