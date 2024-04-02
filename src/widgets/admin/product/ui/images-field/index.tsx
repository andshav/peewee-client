import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { getConvertedImageUrl } from '../../helpers';
import { FieldProps, ProductBody } from '../types';
import { Item } from './item';

export const ImagesField: FC<FieldProps<ProductBody['images']>> = ({
	onChange,
	value,
}) => {
	const [loading, setLoading] = useState(false);

	const moveItems = useCallback((dragIndex: number, hoverIndex: number) => {
		console.log(dragIndex, hoverIndex);
		const newValue = [...value];
		const [removed] = newValue.splice(dragIndex, 1);
		newValue.splice(hoverIndex, 0, removed);
		onChange(newValue);
	}, [onChange, value]);

	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="flex items-center gap-4 justify-between md:justify-start w-full">
				<div className="flex gap-2 items-center">
					<Typography variant="h6">Изображения</Typography>
				</div>
			</div>

			<div className="flex w-full flex-wrap gap-4 content-start">
				{value.map(({ blob }, index) => (
					<Item
						// eslint-disable-next-line react/no-array-index-key
						key={`${blob}`}
						src={blob}
						id={`${blob}-${index}`}
						index={index}
						onRemove={() => onChange(value.filter((_, i) => i !== index))}
						moveItem={moveItems}
					/>
				))}
				<LoadingButton
					loading={loading}
					variant="outlined"
					className="h-24 md:h-32 w-18 md:w-24"
					component="label"
					color="inherit"
				>
					<AiOutlinePlus className="w-8 h-8" />
					<input
						accept="image/*"
						type="file"
						hidden
						onChange={async (e) => {
						if (e.target.files instanceof FileList) {
							setLoading(true);
							const newImages = await Promise.all(
								[...e.target.files].map(async (file) => {
									const imgUrl = await getConvertedImageUrl(file);
									return {
										name: file.name,
										blob: imgUrl,
									};
								}),
							);
							onChange([
								...value,
								...newImages,
							]);
							setLoading(false);
						}
						}}
						multiple
					/>
				</LoadingButton>
			</div>
		</div>
	);
};
