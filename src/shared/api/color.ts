import axios from 'axios';
import { Color } from '../types/color';
import { API_URL } from '.';

class ApiColor {
    #baseUrl = `${API_URL}/api`;

    async getAll() {
        try {
            const { data } = await axios.get<Color[]>(`${this.#baseUrl}/color`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(category: Omit<Color, 'id'>) {
        try {
            const { data } = await axios.post<Color>(`${this.#baseUrl}/color`, category);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update({ id, name, code }: Color) {
        try {
            const { data } = await axios.put<Color>(`${this.#baseUrl}/color/${id}`, { name, code });
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const { data } = await axios.delete<Color>(`${this.#baseUrl}/color/${id}`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const apiColor = new ApiColor();
