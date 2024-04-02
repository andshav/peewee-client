import { Typography } from '@mui/material';
import { FC } from 'react';

interface ColorSelectItemProps {
    name: string;
    code: string;
}

export const ColorSelectItem: FC<ColorSelectItemProps> = ({ name, code }) => (
	<div className="flex gap-2 items-center">
		<div className="w-4 h-4 rounded" style={{ backgroundColor: code }} />
		<Typography>{name}</Typography>
	</div>
);
