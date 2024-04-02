import { type FC } from 'react';
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-creative';

import { Header } from '@/widgets/header';
import { STATIC_URL } from '@/shared/api';

const imageList = [
	`${STATIC_URL}/home/1.jpg`,
	`${STATIC_URL}/home/2.jpg`,
	`${STATIC_URL}/home/3.jpg`,
];

export const HomePage: FC = () => (
	<div>
		<Header className="bg-transparent" />
		<Swiper
			effect="creative"
			modules={[Mousewheel]}
			slidesPerView={1}
			autoplay={{
				delay: 2500,
			}}
			mousewheel
			direction="vertical"
			className="absolute w-[100vw] h-[100vh] left-0 top-0 z-0 ov"
		>
			{imageList.map((img) => (
				<SwiperSlide key={img} className="h-[100vh] w-[100vw]">
					<img src={img} alt="" className="h-full w-full object-cover object-center" />
				</SwiperSlide>
      ))}
		</Swiper>
	</div>
  );
