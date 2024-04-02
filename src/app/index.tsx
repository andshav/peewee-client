import { ThemeProvider } from '@mui/material';
import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminProductPage } from '@/pages/admin/product/ui';
import { AdminProductsPage } from '@/pages/admin/products/ui';
import { CatalogPage } from '@/pages/catalog';
import { HomePage } from '@/pages/home';
import { ProductPage } from '@/pages/product';
import { SweatshirtsPage } from '@/pages/sweatshirts';
import { Layout } from '@/widgets/layout';
import { paths } from '@/shared/routing';
import { theme } from '@/shared/theme';

import './styles/index.scss';

const routes = [
  { path: paths.sweatshirts, element: <SweatshirtsPage /> },
  { path: paths.pants, element: <div /> },
  { path: paths.shorts, element: <div /> },
  { path: paths.suits, element: <div /> },
  { path: paths.tshirts, element: <div /> },
  { path: paths.catalog, element: <CatalogPage /> },
  { path: paths.product, element: <ProductPage /> },
  { path: paths.admin.products, element: <AdminProductsPage /> },
  { path: paths.admin.product, element: <AdminProductPage /> },
];

export const App: FC = () => (
	<DndProvider backend={HTML5Backend}>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					{routes.map(({ path, element }) => (
						<Route
							key={path}
							path={path}
							element={(
								<Layout>
									{element}
								</Layout>
                        )}
						/>
                ))}
					<Route path="/*" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</DndProvider>
);
