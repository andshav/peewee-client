import { Button, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';
import { AiOutlineClose, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';

import { BsTrash } from 'react-icons/bs';
import { AdminSize } from '@/widgets/admin/size/ui';
import { apiSize } from '@/shared/api/size';
import { Size } from '@/shared/types/size';
import { FieldProps, Option } from '../types';

export const SizesField: FC<FieldProps<{id: number | ''; count: number}[]>> = ({
	onChange,
	product,
	value,
}) => {
	const [showAdminSize, setShowAdminSize] = useState(false);

	const [options, setOptions] = useState<null | Option<number, Size>[]>(null);

	const getSizeLabel = (size: Size) => `${size.min} – ${size.max}`;

	const updateOptions = useCallback(() => {
		apiSize.getAll()
			.then((res) => setOptions(
				(res || []).map((item) => ({
					label: getSizeLabel(item),
					value: item.id,
					data: item,
				})),
			));
	}, []);

	const allowAdd = useMemo(() => {
		if (!options) return true;
		return options.length > value.length;
	}, [options, value.length]);

	const closeAdminSize = () => {
		setShowAdminSize(false);
		updateOptions();
	};

	return (
		<div className="flex flex-col gap-4 w-full md:w-auto">
			<div className="flex items-center gap-4 justify-between w-full">
				<Typography variant="h6">Размеры</Typography>
				<IconButton
					size="small"
					onClick={() => setShowAdminSize(true)}
				>
					<AiOutlineSetting />
				</IconButton>
				<Dialog
					open={showAdminSize}
					onClose={closeAdminSize}
				>
					<DialogTitle className="my-8">
						<div className="flex items-center gap-4 justify-between">
							Управление размерами
							<IconButton
								aria-label="close"
								onClick={closeAdminSize}
							>
								<AiOutlineClose />
							</IconButton>
						</div>
					</DialogTitle>
					<DialogContent>
						<AdminSize />
					</DialogContent>
				</Dialog>
			</div>
			<div className="flex flex-col gap-4 w-full">
				{
					value.map(({ id, count }, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={`${id}-${index}`} className="flex gap-4 items-center w-full justify-between">
							<div className="flex gap-4 items-center w-full">
								<FormControl fullWidth size="small">
									<InputLabel id={`size-${index}`}>
										Размер
									</InputLabel>
									<Select
										size="small"
										autoFocus={id === ''}
										fullWidth
										label="Размер"
										labelId={`size-${index}`}
										onOpen={() => {
											if (options) return;
											updateOptions();
										}}
										// @ts-ignore
										onChange={(e) => onChange(value.map((item, i) => ({
											...item,
											id: i === index ? e.target.value : item.id,
										})))}
										value={id}
									>
										{
										options === null && product && id !== '' && (
											<MenuItem
												value={product.sizes[index].id}
											>
												{getSizeLabel(product.sizes[index])}
											</MenuItem>
										)
									}
										{
										options !== null && options.map((opt) => (
											<MenuItem
												disabled={value.some((val) => val.id === opt.value)}
												key={opt.value}
												value={opt.value}
											>
												{opt.label}
											</MenuItem>
										))
									}
									</Select>
								</FormControl>
								<TextField
									size="small"
									className="w-20 md:w-24"
									type="number"
									value={count}
									variant="standard"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Typography>шт</Typography>
											</InputAdornment>
										),
									}}
									// @ts-ignore
									onChange={(e) => onChange(value.map((item, i) => ({
										...item,
										count: i === index ? e.target.value : item.count,
									})))}
								/>
							</div>

							<IconButton
								size="small"
								onClick={() => {
									onChange(value.filter((item) => id !== item.id));
								}}
							>
								<BsTrash />
							</IconButton>
						</div>
					))
				}
				<Button
					onClick={() => {
						onChange([...value, { id: '', count: 0 }]);
					}}
					disabled={!allowAdd}
					color="inherit"
					className="h-8"
					variant="outlined"
					fullWidth
				>
					<AiOutlinePlus className="w-6 h-6" />
				</Button>
			</div>
		</div>
	);
};
