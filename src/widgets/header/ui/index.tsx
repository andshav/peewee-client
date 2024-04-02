import { Drawer } from '@mui/material';
import { FC, useState } from 'react';
import { AiOutlineMenu, AiOutlineHeart } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import { Logo } from './logo';
import { Menu } from './menu';
import { Search } from './search';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className = '' }) => {
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  return (
	<div className={`px-4 sm:px-6 lg:px-8 z-10 sticky left-0 top-0 ${className}`}>
		<div className="h-16 flex items-center justify-between gap-4">
			<AiOutlineMenu
				onClick={() => setShowMenu(true)}
				className="w-6 h-6 cursor-pointer"
			/>
			<Logo className="absolute left-[50%] translate-x-[-50%]" />
			<div className="flex items-center gap-6">
				<Search />
				<AiOutlineHeart className="cursor-pointer" />
				<BsBag className="cursor-pointer" />
			</div>
		</div>
		<Drawer
			anchor="left"
			open={showMenu}
			onClose={closeMenu}
		>
			<Menu onClose={closeMenu} />
		</Drawer>
	</div>
  );
};
