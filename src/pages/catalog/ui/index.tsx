import { Breadcrumbs, Typography } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Catalog } from '@/widgets/catalog';
import { dictPath } from '@/widgets/layout/helpers';
import { paths } from '@/shared/routing';

export const CatalogPage = () => (
	<div className="flex flex-col gap-6 px-4 md:px-8">
		<Breadcrumbs>
			<Link className="hover:text-black cursor-pointer" to={paths.home}>
				<AiFillHome />
			</Link>
			<Typography>
				{dictPath.catalog.toLowerCase()}
			</Typography>
		</Breadcrumbs>
		<Catalog />
	</div>
);
