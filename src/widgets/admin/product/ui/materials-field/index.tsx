import { Button, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';
import { AiOutlineClose, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';

import { BsTrash } from 'react-icons/bs';
import { AdminMaterial } from '@/widgets/admin/material/ui';
import { apiMaterial } from '@/shared/api/material';
import { Material } from '@/shared/types/material';
import { FieldProps, Option } from '../types';

export const MaterialsField: FC<FieldProps<{id: number | '', percentage: number}[]>> = ({
	onChange,
	product,
	value,
}) => {
	const [showAdminMaterial, setShowAdminMaterial] = useState(false);

	const [options, setOptions] = useState<null | Option<number, Material>[]>(null);

	const updateOptions = useCallback(() => {
		apiMaterial.getAll()
			.then((res) => setOptions(
				(res || []).map((item) => ({
					label: item.name,
					value: item.id,
					data: item,
				})),
			));
	}, []);

	const allowAdd = useMemo(() => {
		if (!options) return true;
		return options.length > value.length;
	}, [options, value.length]);

	const closeAdminMaterial = () => {
		setShowAdminMaterial(false);
		updateOptions();
	};

	return (
		<div className="flex flex-col gap-4 w-full md:w-auto">
			<div className="flex items-center gap-4 justify-between w-full">
				<Typography variant="h6">Состав</Typography>
				<IconButton
					size="small"
					onClick={() => setShowAdminMaterial(true)}
				>
					<AiOutlineSetting />
				</IconButton>
				<Dialog
					open={showAdminMaterial}
					onClose={closeAdminMaterial}
				>
					<DialogTitle className="my-8">
						<div className="flex items-center gap-4 justify-between">
							Управление материалами
							<IconButton
								aria-label="close"
								onClick={closeAdminMaterial}
							>
								<AiOutlineClose />
							</IconButton>
						</div>
					</DialogTitle>
					<DialogContent>
						<AdminMaterial />
					</DialogContent>
				</Dialog>
			</div>
			<div className="flex flex-col gap-4 w-full">
				{
					value.map(({ id, percentage }, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={`${id}-${index}`} className="flex gap-4 items-center w-full justify-between">
							<div className="flex gap-4 items-center w-full">
								<FormControl fullWidth size="small">
									<InputLabel id={`material-${index}`}>
										Материал
									</InputLabel>
									<Select
										size="small"
										autoFocus={id === ''}
										fullWidth
										label="Материал"
										labelId={`material-${index}`}
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
													value={product.product_name.materials[index].id}
												>
													{product.product_name.materials[index].name}
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
									className="w-16 md:w-20"
									type="number"
									variant="standard"
									value={percentage}
									InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Typography>%</Typography>
										</InputAdornment>
									),
								}}
								// @ts-ignore
									onChange={(e) => onChange(value.map((item, i) => ({
										...item,
										percentage: i === index ? e.target.value : item.percentage,
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
						onChange([...value, { id: '', percentage: 0 }]);
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
