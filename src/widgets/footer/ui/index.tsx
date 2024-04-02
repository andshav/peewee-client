import { Link, Typography } from '@mui/material';
import { FC } from 'react';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { BsInstagram, BsTelegram } from 'react-icons/bs';

export const Footer: FC = () => (
	<div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center gap-4 border-t-[1px] border-t-gray-300 border-solid md:flex-row md:justify-between">
		<div className="w-full flex items-center justify-around gap-8 md:w-auto md:justify-normal">
			<Link color="inherit" underline="hover" href="https://instagram.com/pwee_shop" target="_blank" rel="noreferrer">
				<div className="flex gap-1 items-center">
					<BsInstagram />
					<Typography className="cursor-pointer">
						INSTAGRAM
					</Typography>
				</div>
			</Link>
			<Link color="inherit" underline="hover" href="https://t.me/PeeWeeShop" target="_blank" rel="noreferrer">
				<div className="flex gap-1 items-center">
					<BsTelegram />
					<Typography className="cursor-pointer">
						TELEGRAM
					</Typography>
				</div>
			</Link>
		</div>
		<div className="flex items-center gap-2">
			<AiOutlineCopyrightCircle />
			<Typography>2022–2023</Typography>
			<Typography>PeeWee</Typography>
		</div>
	</div>
);
