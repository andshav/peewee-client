import { Product } from '@/shared/types/product';

export interface AdminProductProps {
	product: Product | null;
}

export interface FieldProps<T> extends AdminProductProps {
    value: T;
    onChange: (newValue: T) => void;
}

export interface Option<T, D> {
    value: T;
    label: string;
    data: D
}

export interface ProductBody {
	article: string;
	name: string;
	categoryId: number | null;
	price: number;
	desc: string;
	colorId: number | null;
	materials: {id: number | '', percentage: number}[];
	sizes: {id: number | ''; count: number}[];
	images: {blob: string, name: string}[];
	infos: {title: string; desc: string}[];
}
