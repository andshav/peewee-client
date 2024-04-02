import { Chip, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Category } from '@/shared/types/category';
import { useCategory } from '../model';

export const AdminCategory: FC = () => {
	const {
		categories,
		create,
		delete: deleteCategory,
		getAll,
		update,
	} = useCategory();

	const [localValues, setLocalValues] = useState<(Category & {editMode: boolean})[]>([]);
	const [addMode, setAddMode] = useState(false);
	const [newCategoryName, setNewCategoryName] = useState('');

	useEffect(() => {
		getAll();
	}, []);

	useEffect(() => {
		if (categories) setLocalValues(categories.map((i) => ({ ...i, editMode: false })));
	}, [categories]);

	return (
		<div className="flex items-center gap-2 flex-wrap">
			{
				localValues?.map(({ id, name, editMode }, index) => (
					editMode ? (
						<TextField
							autoFocus
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
									update({ id, name }).then(() => {
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
								endAdornment: (
									<InputAdornment position="end">
										<div className="flex items-center gap-1">
											<IconButton
												size="small"
												onClick={() => {
													if (categories) {
														setLocalValues((prev) => {
															const newValues = [...prev];
															newValues[index].editMode = false;
															newValues[index].name = categories[index].name;
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
													update({ id, name }).then(() => {
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
							label={(
								<Typography>{name}</Typography>
							)}
							onDelete={() => deleteCategory(id).then(() => getAll())}
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
						value={newCategoryName}
						onChange={({ target: { value } }) => setNewCategoryName(value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								create(newCategoryName).then(() => {
									getAll();
									setNewCategoryName('');
									setAddMode(false);
								});
							}
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<div className="flex items-center gap-1">
										<IconButton
											size="small"
											onClick={() => {
												setNewCategoryName('');
												setAddMode(false);
											}}
										>
											<AiOutlineClose />
										</IconButton>
										<IconButton
											size="small"
											onClick={() => {
												create(newCategoryName).then(() => {
													getAll();
													setNewCategoryName('');
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
