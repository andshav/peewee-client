import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Navigation, Mousewheel } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { STATIC_URL } from '@/shared/api';
import { Product } from '@/shared/types/product';
import styles from './styles.module.css';

interface Props {
	product: Product;
}

export const ProductGallery: FC<Props> = ({ product }) => {
	const swiperMainRef = useRef<SwiperRef>(null);
	const swiperNavRef = useRef<SwiperRef>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [imgHoverPosition, setImgHoverPosition] = useState({ x: 0, y: 0 });
	const [sliderActiveIndex, setSlideActiveIndex] = useState(0);

    const handlePrev = useCallback(() => {
        if (!swiperNavRef.current) return;
        swiperNavRef.current.swiper.slidePrev();
    }, [swiperNavRef]);

    const handleNext = useCallback(() => {
        if (!swiperNavRef.current) return;
        swiperNavRef.current.swiper.slideNext();
    }, [swiperNavRef]);

	useEffect(() => {
		if (containerRef.current && swiperMainRef.current) {
			containerRef.current.style.height = `${swiperMainRef.current.swiper.height}px`;
		}
	}, [containerRef]);

	return (
		<div
			ref={containerRef}
			className="flex gap-4"
		>
			<div className="hidden md:flex flex-col gap-2 w-1/6 items-center">
				<BsChevronUp className={`${styles.swiperNavBtn} -top-6 left-1/2`} onClick={handlePrev} />
				<Swiper
					ref={swiperNavRef}
					direction="vertical"
					modules={[Mousewheel]}
					slidesPerView="auto"
					spaceBetween={8}
				>
					{product.images.map(({ src }, index) => (
						<SwiperSlide
							key={src}
							onClick={() => {
                                if (swiperMainRef.current) {
                                    swiperMainRef.current.swiper.slideTo(index);
                                    setSlideActiveIndex(index);
                                }
                            }}
							className={`h-fit cursor-pointer ${sliderActiveIndex === index ? 'border-2 border-primary' : ''}`}
						>
							<img
								height="100%"
								src={`${STATIC_URL}/${src}`}
								alt=""
							/>
						</SwiperSlide>
                    ))}
				</Swiper>
				<BsChevronDown className={`${styles.swiperNavBtn} -bottom-6 left-1/2`} onClick={handleNext} />
			</div>
			<Swiper
				ref={swiperMainRef}
				navigation
				modules={[Navigation, Mousewheel]}
				onActiveIndexChange={(swiper) => {
                    setSlideActiveIndex(swiper.activeIndex);
                }}
				slidesPerView={1}
				onUpdate={(swiper) => {
                    if (containerRef.current) {
                        containerRef.current.style.height = `${swiper.height}px`;
                    }
                }}
				className="h-fit w-full md:-5/6"
			>
				{product.images.map(({ src }) => (
					<SwiperSlide key={src}>
						<img
							key={src}
							src={`${STATIC_URL}/${src}`}
							alt=""
							style={{ objectPosition: `${imgHoverPosition.x * 100}% ${imgHoverPosition.y * 100}%` }}
							className="md:hover:object-none"
							onMouseMove={(e) => {
								// @ts-ignore
								const rect = e.target.getBoundingClientRect();
								setImgHoverPosition({
									x: (e.clientX - rect.left) / rect.width,
									y: (e.clientY - rect.top) / rect.height,
								});
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
