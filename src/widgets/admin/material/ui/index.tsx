import { Chip, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Material } from '@/shared/types/material';
import { useMaterial } from '../model';

export const AdminMaterial: FC = () => {
	const {
		materials,
		create,
		delete: deleteMaterial,
		getAll,
		update,
	} = useMaterial();

	const [localValues, setLocalValues] = useState<(Material & {editMode: boolean})[]>([]);
	const [addMode, setAddMode] = useState(false);
	const [newMaterialName, setNewMaterialName] = useState('');

	useEffect(() => {
		getAll();
	}, []);

	useEffect(() => {
		if (materials) setLocalValues(materials.map((i) => ({ ...i, editMode: false })));
	}, [materials]);

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
													if (materials) {
														setLocalValues((prev) => {
															const newValues = [...prev];
															newValues[index].editMode = false;
															newValues[index].name = materials[index].name;
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
							onDelete={() => deleteMaterial(id).then(() => getAll())}
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
						value={newMaterialName}
						onChange={({ target: { value } }) => setNewMaterialName(value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								create(newMaterialName).then(() => {
									getAll();
									setNewMaterialName('');
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
												setNewMaterialName('');
												setAddMode(false);
											}}
										>
											<AiOutlineClose />
										</IconButton>
										<IconButton
											size="small"
											onClick={() => {
												create(newMaterialName).then(() => {
													getAll();
													setNewMaterialName('');
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
