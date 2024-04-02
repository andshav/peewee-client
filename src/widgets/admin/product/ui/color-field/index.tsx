import { Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { AiOutlineClose, AiOutlineSetting } from 'react-icons/ai';

import { AdminColor } from '@/widgets/admin/color/ui';
import { ColorSelectItem } from '@/widgets/product/ui/color-select-item';
import { apiColor } from '@/shared/api/color';
import { Color } from '@/shared/types/color';
import { FieldProps, Option } from '../types';

export const ColorField: FC<FieldProps<number | null>> = ({
	product,
	value,
	onChange,
}) => {
	const [showAdminColor, setShowAdminColor] = useState(false);

	const [options, setOptions] = useState<null | Option<number, Color>[]>(null);

	const updateOptions = useCallback(() => {
		apiColor.getAll()
			.then((res) => setOptions(
				(res || []).map((item) => ({
					label: item.name,
					value: item.id,
					data: item,
				})),
			));
	}, []);

	const closeAdminColor = () => {
		setShowAdminColor(false);
		updateOptions();
	};
	return (
		<div className="flex gap-1 items-center justify-between md:justify-start w-full">
			<FormControl size="small" fullWidth>
				<InputLabel id="color">Цвет</InputLabel>
				<Select
					size="small"
					labelId="category"
					className="min-w-[164px]"
					value={value || ''}
					label="Цвет"
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
								value={product.color.id}
							>
								<ColorSelectItem
									code={product.color.code}
									name={product.color.name}
								/>
							</MenuItem>
						)
					}
					{
						options !== null && options.map(({ value, data }) => (
							<MenuItem key={value} value={value}>
								<ColorSelectItem
									code={data.code}
									name={data.name}
								/>
							</MenuItem>
						))
					}
				</Select>
			</FormControl>
			<IconButton
				size="small"
				onClick={() => setShowAdminColor(true)}
			>
				<AiOutlineSetting />
			</IconButton>
			<Dialog
				open={showAdminColor}
				onClose={closeAdminColor}
			>
				<DialogTitle className="my-8">
					<div className="flex items-center gap-4 justify-between">
						Управление цветами
						<IconButton
							aria-label="close"
							onClick={closeAdminColor}
						>
							<AiOutlineClose />
						</IconButton>
					</div>
				</DialogTitle>
				<DialogContent>
					<AdminColor />
				</DialogContent>
			</Dialog>
		</div>
	);
};
