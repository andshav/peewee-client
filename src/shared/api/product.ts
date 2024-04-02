import axios from 'axios';
import heic2any from 'heic2any';
import { ProductBody } from '@/widgets/admin/product/ui/types';
import { Product } from '../types/product';
import { API_URL } from '.';

class ApiProduct {
    #baseUrl = `${API_URL}/api`;

    async getOne(id: number) {
        try {
            const { data } = await axios.get<Product>(`${this.#baseUrl}/product/${id}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAll() {
        try {
            const { data } = await axios.get<Product[]>(`${this.#baseUrl}/product`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllByName(productNameId: number) {
        try {
            const { data } = await axios.get<Product[]>(`${this.#baseUrl}/product`, { params: { productNameId } });
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(product: ProductBody) {
        try {
            const images = await Promise.all(
                product.images.map(({ blob }) => fetch(blob)
                .then((res) => res.blob())
                .then((blob) => heic2any({ blob }) as Promise<Blob>)),
            );
            const formData = new FormData();

            images.forEach((image, index) => {
                formData.append('images', image, product.images[index].name);
            });
            formData.append('body', JSON.stringify(product));
            const { data } = await axios.put(`${this.#baseUrl}/product/${product.article}`, formData);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(product: ProductBody) {
        try {
            const images = await Promise.all(
                    product.images.map(({ blob }) =>
                        fetch(blob)
                            .then((res) => res.blob())),
            );
            const formData = new FormData();

            images.forEach((image, index) => {
                formData.append('images', image, product.images[index].name);
            });
            formData.append('body', JSON.stringify(product));
            const { data } = await axios.post(`${this.#baseUrl}/product`, formData);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(article: ProductBody['article']) {
        try {
            await axios.delete(`${this.#baseUrl}/product/${article}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const apiProduct = new ApiProduct();
