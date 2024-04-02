import axios from 'axios';
import { Size } from '../types/size';
import { API_URL } from '.';

class ApiSize {
    #baseUrl = `${API_URL}/api`;

    async getAll() {
        try {
            const { data } = await axios.get<Size[]>(`${this.#baseUrl}/size`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(size: Omit<Size, 'id'>) {
        try {
            const { data } = await axios.post<Size>(`${this.#baseUrl}/size`, size);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update({ id, name, min, max }: Size) {
        try {
            const { data } = await axios.put<Size>(`${this.#baseUrl}/size/${id}`, { name, min, max });
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const { data } = await axios.delete<Size>(`${this.#baseUrl}/size/${id}`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const apiSize = new ApiSize();
