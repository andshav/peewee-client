import { Drawer, Input, InputAdornment } from '@mui/material';
import { FC, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { Catalog } from '@/widgets/catalog';

export const Search: FC = () => {
	const [showSearchPage, setShowSearchPage] = useState(false);
	return (
		<>
			<FiSearch className="cursor-pointer" onClick={() => setShowSearchPage(true)} />
			<Drawer
				open={showSearchPage}
				anchor="top"
			>
				<div className="relative w-[100vw] h-[100vh]">
					<div className="mx-auto max-w-7xl py-16 px-8 flex flex-col gap-10 items-center">
						<Input
							className="w-full md:w-96"
							startAdornment={(
								<InputAdornment position="start">
									<FiSearch />
								</InputAdornment>
							)}
						/>
						<Catalog />
					</div>
					<AiOutlineClose
						className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
						onClick={() => setShowSearchPage(false)}
					/>
				</div>
			</Drawer>
		</>
	);
};
