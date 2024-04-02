import { IconButton, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface ProductCardProps {
	title: string;
	price: number;
	mainImg: string;
	hoverImageList: string[];
	isFavourite?: boolean;
	path: string
}

export const ProductCard: FC<ProductCardProps> = ({
	title,
	price,
	mainImg,
	hoverImageList = [],
	isFavourite = false,
	path,
}) => {
	const [activeImg, setActiveImg] = useState(mainImg);
	const imgRef = useRef<HTMLImageElement>(null);
	useEffect(() => {
		const setProductCardHeight = () => {
			if (imgRef.current) { imgRef.current.style.height = `${(imgRef.current.offsetWidth * 4) / 3}px` }
		};
		window.addEventListener('resize', setProductCardHeight);
		setProductCardHeight();
		return () => window.removeEventListener('resize', setProductCardHeight);
	});
	return (
		<div
			onMouseLeave={() => setActiveImg(mainImg)}
			className="flex flex-col gap-2 justify-between"
		>
			<div className="flex flex-col gap-2">
				<div className="relative">
					<img ref={imgRef} src={activeImg} className="w-full object-cover object-center" alt="" />
					<Link className="cursor-pointer" to={path}>
						<div
							className="absolute left-0 top-0 w-full h-full grid"
							style={{ gridTemplateColumns: `repeat(${hoverImageList.length}, minmax(0, 1fr))` }}
						>
							{hoverImageList.map((img) => (
								<div key={img} className="h-full w-full" onMouseEnter={() => setActiveImg(img)} />
							))}
						</div>
					</Link>
					<div className="absolute right-2 top-2">
						<IconButton
							className="!bg-white"
							size="small"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							{isFavourite ? <AiFillHeart /> : <AiOutlineHeart />}
						</IconButton>
					</div>

				</div>
				<Link className="cursor-pointer" to={path}>
					<Typography className="hover:underline">{title}</Typography>
				</Link>
			</div>
			<div className="flex justify-between gap-2">
				<Typography>{price.toLocaleString()} RUB</Typography>
			</div>
		</div>
	);
};
