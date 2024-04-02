import { Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import { FC } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { FieldProps, ProductBody } from '../types';

export const InfoField: FC<FieldProps<ProductBody['infos']>> = ({
	onChange,
	value,
}) => (
	<div className="flex flex-col gap-4 w-full md:w-auto">
		<div className="flex items-center gap-4 justify-between md:justify-start w-full">
			<div className="flex gap-2 items-center">
				<Typography variant="h6">Дополнительная информация</Typography>
				{/* <IconButton
					onClick={() => {
						onChange([...value, { title: '', desc: '' }]);
					}}
					size="small"
				>
					<AiOutlinePlus />
				</IconButton> */}
			</div>
		</div>
		<div className="flex flex-col gap-4 w-full">
			{
				value.map(({ title, desc }, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<Paper key={`${index}`} className="flex gap-4 items-center w-full justify-between p-4" elevation={6}>
						<div className="flex flex-col md:flex-row w-full gap-4 items-center">
							<TextField
								fullWidth
								size="small"
								label="Название"
								value={title}
								onChange={(e) => {
									const newState = [...value];
									newState[index].title = e.target.value;
									onChange(newState);
								}}
							/>
							<TextField
								fullWidth
								size="small"
								label="Описание"
								value={desc}
								onChange={(e) => {
									const newState = [...value];
									newState[index].desc = e.target.value;
									onChange(newState);
								}}
							/>
						</div>
						<IconButton
							size="small"
							onClick={() => {
								onChange(value.filter((_, i) => i !== index));
							}}
						>
							<BsTrash />
						</IconButton>
					</Paper>
				))
			}
			<Button
				color="inherit"
				variant="outlined"
				className="h-8"
				onClick={() => {
					onChange([...value, { title: '', desc: '' }]);
				}}
			>
				<AiOutlinePlus className="w-6 h-6" />
			</Button>
		</div>
	</div>
);
