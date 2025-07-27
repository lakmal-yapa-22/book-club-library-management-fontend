import type { Reader } from '../types/reader';
import apiClient from './apiClient';

export const fetchReaders = async (): Promise<Reader[]> => {
    try {
        const response = await apiClient.get('/reader');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch readers');
    }
};

export const createReader = async (reader: Omit<Reader, 'id' | 'borrowedBooks'>): Promise<Reader> => {
    try {
        const response = await apiClient.post('/reader', reader);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to create reader');
    }
};

export const updateReader = async (
    id: string,
    reader: Omit<Reader, 'id' | 'borrowedBooks'>
): Promise<Reader> => {
    try {
        const response = await apiClient.put(`/reader/${id}`, reader);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to update reader');
    }
};

export const deleteReader = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/reader/${id}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to delete reader');
    }
};
