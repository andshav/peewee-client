import axios from 'axios';
import { Category } from '../types/category';
import { API_URL } from '.';

class ApiMaterial {
    #baseUrl = `${API_URL}/api`;

    async getAll() {
        try {
            const { data } = await axios.get<Category[]>(`${this.#baseUrl}/material`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(name: string) {
        try {
            const { data } = await axios.post<Category>(`${this.#baseUrl}/material`, { name });
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update({ id, name }: Category) {
        try {
            const { data } = await axios.put<Category>(`${this.#baseUrl}/material/${id}`, { name });
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const { data } = await axios.delete<Category>(`${this.#baseUrl}/material/${id}`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const apiMaterial = new ApiMaterial();
