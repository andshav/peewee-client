import { Typography } from '@mui/material';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { menuItems } from '@/shared/constants';

interface MenuProps {
	onClose: () => void;
}

export const Menu:FC<MenuProps> = ({ onClose }) => (
	<div className="flex flex-col pl-4 sm:pl-6 lg:pl-8 gap-20 pr-28 md:min-w-fit min-w-[100vw]">
		<div className="h-16 flex items-center">
			<AiOutlineClose
				className="w-6 h-6 cursor-pointer"
				onClick={onClose}
			/>
		</div>
		<div className="flex flex-col gap-3">
			{menuItems.map(({ name, path }) => (
				<Link
					key={`${path}-${name}`}
					to={path}
					className="cursor-pointer"
					onClick={onClose}
				>
					<Typography variant="h5">
						{name}
					</Typography>
				</Link>
			))}
		</div>
	</div>
);
