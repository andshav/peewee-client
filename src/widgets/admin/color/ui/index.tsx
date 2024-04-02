import { Button, Chip, Dialog, DialogActions, DialogContent, IconButton, InputAdornment, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';

import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { ColorSelectItem } from '@/widgets/product/ui/color-select-item';
import { Color } from '@/shared/types/color';
import { useColor } from '../model';

export const AdminColor: FC = () => {
	const {
		colors,
		create,
		delete: deleteColor,
		getAll,
		update,
	} = useColor();

	const [localValues, setLocalValues] = useState<(Color & {editMode: boolean})[]>([]);
	const [addMode, setAddMode] = useState(false);
	const [newColor, setNewColor] = useState<Omit<Color, 'id'>>({
		name: '',
		code: '#000',
	});

	const [showColorPickerDialog, setShowColorPickerDialog] = useState(false);
	const [localColorPicker, setLocalColorPicker] = useState<string>();

	const closeColorPickerDialog = () => {
		setLocalColorPicker(undefined);
		setShowColorPickerDialog(false);
	};

	useEffect(() => {
		getAll();
	}, []);

	useEffect(() => {
		if (colors) setLocalValues(colors.map((i) => ({ ...i, editMode: false })));
	}, [colors]);

	return (
		<div className="flex items-center gap-2 flex-wrap">
			{
				localValues?.map(({ id, name, code, editMode }, index) => (
					editMode ? (
						<TextField
							size="small"
							key={id}
							value={name}
							onChange={({ target: { value } }) => setLocalValues((prev) => {
								const newValues = [...prev];
								newValues[index].name = value;
								return newValues;
							})}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									update({ id, name, code }).then(() => {
										getAll();
										setLocalValues((prev) => {
											const newValues = [...prev];
											newValues[index].editMode = false;
											return newValues;
										});
										setAddMode(false);
									});
								}
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<div
											className="w-4 h-4 cursor-pointer"
											style={{ backgroundColor: code }}
											onClick={() => {
												setShowColorPickerDialog(true);
												setLocalColorPicker(code);
											}}
										/>
										<Dialog
											open={showColorPickerDialog}
											onClose={closeColorPickerDialog}
										>
											<DialogContent>
												<ChromePicker
													color={localColorPicker}
													onChange={(({ hex }) => {
														setLocalColorPicker(hex);
													})}
												/>
											</DialogContent>
											<DialogActions>
												<Button
													onClick={closeColorPickerDialog}
													color="inherit"
												>
													Отменить
												</Button>
												<Button
													variant="contained"
													onClick={() => {
														if (localColorPicker) {
															setLocalValues((prev) => {
																const newValues = [...prev];
																newValues[index].code = localColorPicker;
																return newValues;
															});
														}
														closeColorPickerDialog();
													}}
												>
													Изменить
												</Button>
											</DialogActions>
										</Dialog>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<div className="flex items-center gap-1">
											<IconButton
												size="small"
												onClick={() => {
													if (colors) {
														setLocalValues((prev) => {
															const newValues = [...prev];
															newValues[index].editMode = false;
															newValues[index].code = colors[index].code;
															newValues[index].name = colors[index].name;
															return newValues;
														});
													}
												}}
											>
												<AiOutlineClose />
											</IconButton>
											<IconButton
												size="small"
												onClick={() => {
													update({ id, name, code }).then(() => {
														getAll();
														setLocalValues((prev) => {
															const newValues = [...prev];
															newValues[index].editMode = false;
															return newValues;
														});
														setAddMode(false);
													});
												}}
											>
												<AiOutlineCheck />
											</IconButton>
										</div>
									</InputAdornment>
								),
							}}
						/>
					) : (
						<Chip
							key={id}
							label={(<ColorSelectItem name={name} code={code} />)}
							onDelete={() => deleteColor(id).then(() => getAll())}
							onClick={() => {
								setAddMode(false);
								setLocalValues((prev) => prev.map((item, i) => ({
									...item,
									editMode: i === index,
								})));
							}}
						/>
					)
				))
			}
			{
				addMode ? (
					<TextField
						autoFocus
						size="small"
						value={newColor.name}
						onChange={({ target: { value } }) => setNewColor((prev) => ({
							...prev,
							name: value,
						}))}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								create(newColor).then(() => {
									getAll();
									setNewColor({ name: '', code: '#000' });
									setAddMode(false);
								});
							}
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<div
										className="w-4 h-4 cursor-pointer"
										style={{ backgroundColor: newColor.code }}
										onClick={() => {
											setShowColorPickerDialog(true);
											setLocalColorPicker(newColor.code);
										}}
									/>
									<Dialog
										open={showColorPickerDialog}
										onClose={closeColorPickerDialog}
									>
										<DialogContent>
											<ChromePicker
												color={localColorPicker}
												onChange={(({ hex }) => {
													setLocalColorPicker(hex);
												})}
											/>
										</DialogContent>
										<DialogActions>
											<Button
												onClick={closeColorPickerDialog}
												color="inherit"
											>
												Отменить
											</Button>
											<Button
												variant="contained"
												onClick={() => {
													if (localColorPicker) {
														setNewColor((prev) => ({
															...prev,
															code: localColorPicker,
														}));
													}
													closeColorPickerDialog();
												}}
											>
												Изменить
											</Button>
										</DialogActions>
									</Dialog>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<div className="flex items-center gap-1">
										<IconButton
											size="small"
											onClick={() => {
												setNewColor({ name: '', code: '#000' });
												setAddMode(false);
											}}
										>
											<AiOutlineClose />
										</IconButton>
										<IconButton
											size="small"
											onClick={() => {
												create(newColor).then(() => {
													getAll();
													setNewColor({ name: '', code: '#000' });
													setAddMode(false);
												});
											}}
										>
											<AiOutlinePlus />
										</IconButton>
									</div>
								</InputAdornment>
							),
						}}
					/>
				) : (
					<IconButton
						size="small"
						onClick={() => {
							setLocalValues((prev) => prev.map((item) => ({ ...item, editMode: false })));
							setAddMode(true);
						}}
					>
						<AiOutlinePlus />
					</IconButton>
				)
			}
		</div>
	);
};
