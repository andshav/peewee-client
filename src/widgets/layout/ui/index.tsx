import { FC, PropsWithChildren } from 'react';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
	<div className="min-h-full flex flex-col bg-gray-100">
		<Header className="bg-white" />
		<main className="flex-grow mx-auto py-4 flex flex-col gap-8 w-full xl:max-w-screen-xl">
			{children}
		</main>
		<Footer />
	</div>
);
