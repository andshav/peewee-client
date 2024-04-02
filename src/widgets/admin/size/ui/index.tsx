import { Chip, IconButton, Paper, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Size } from '@/shared/types/size';
import { useSize } from '../model';

export const AdminSize: FC = () => {
	const {
		sizes,
		create,
		delete: deleteSize,
		getAll,
		update,
	} = useSize();

	const [localValues, setLocalValues] = useState<(Size & {editMode: boolean})[]>([]);
	const [addMode, setAddMode] = useState(false);
	const [newSize, setNewSize] = useState<Omit<Size, 'id'>>({ min: 0, max: 0, name: null });

	useEffect(() => {
		getAll();
	}, []);

	useEffect(() => {
		if (sizes) setLocalValues(sizes.map((i) => ({ ...i, editMode: false })));
	}, [sizes]);

	return (
		<div className="flex items-center gap-2 flex-wrap">
			{
				localValues?.map(({ id, name, min, max, editMode }, index) => (
					editMode ? (
						<Paper key={id} className="p-4">
							<div className="flex items-center gap-2">
								<TextField
									className="w-24"
									autoFocus
									size="small"
									type="number"
									value={min}
									onChange={({ target: { value } }) => {
										setLocalValues((prev) => {
											const newValues = [...prev];
											newValues[index].min = +value;
											return newValues;
										});
									}}
								/>
								<Typography>–</Typography>
								<TextField
									className="w-24"
									autoFocus
									size="small"
									type="number"
									value={max}
									onChange={({ target: { value } }) => {
										setLocalValues((prev) => {
											const newValues = [...prev];
											newValues[index].max = +value;
											return newValues;
										});
									}}
								/>
								<div className="flex items-center gap-1">
									<IconButton
										size="small"
										onClick={() => {
										if (sizes) {
											setLocalValues((prev) => {
												const newValues = [...prev];
												newValues[index].editMode = false;
												newValues[index].min = sizes[index].min;
												newValues[index].max = sizes[index].max;
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
										update({ id, name, max, min }).then(() => {
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
							</div>
						</Paper>
					) : (
						<Chip
							key={id}
							label={(
								<Typography>{min} – {max}</Typography>
							)}
							onDelete={() => deleteSize(id).then(() => getAll())}
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
					<Paper elevation={6} className="p-4">
						<div className="flex items-center gap-2">
							<TextField
								className="w-24"
								autoFocus
								size="small"
								type="number"
								value={newSize.min}
								onChange={({ target: { value } }) => {
									setNewSize((prev) => ({
										...prev,
										min: +value,
									}));
								}}
							/>
							<Typography>–</Typography>
							<TextField
								className="w-24"
								size="small"
								type="number"
								value={newSize.max}
								onChange={({ target: { value } }) => {
									setNewSize((prev) => ({
										...prev,
										max: +value,
									}));
								}}
							/>
							<div className="flex items-center gap-1">
								<IconButton
									size="small"
									onClick={() => {
										setNewSize({ min: 0, max: 0, name: null });
										setAddMode(false);
									}}
								>
									<AiOutlineClose />
								</IconButton>
								<IconButton
									size="small"
									onClick={() => {
										create(newSize).then(() => {
											getAll();
											setNewSize({ min: 0, max: 0, name: null });
											setAddMode(false);
										});
									}}
								>
									<AiOutlinePlus />
								</IconButton>
							</div>
						</div>
					</Paper>
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
