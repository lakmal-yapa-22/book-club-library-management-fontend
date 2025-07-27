import type { IssuedBook } from '../types/issueBook';
import apiClient from './apiClient'; // Axios instance or similar

export const fetchIssuedBooksAPI = async (): Promise<{ data: IssuedBook[]; message?: string }> => {
    try {
        const response = await apiClient.get('/issuebook');
        const result = response.data;

        // If API sends { data: [...] }, get the array inside 'data'
        const data: IssuedBook[] = Array.isArray(result.data) ? result.data : Array.isArray(result) ? result : [];

        return { data, message: result.message };
    } catch (error: any) {
        return {
            data: [],
            message: error.response?.data?.message || error.message || 'Network error',
        };
    }
};

export const issueBookAPI = async (issueForm: { book: string; reader: string; dueDate: string }) => {
    try {
        const response = await apiClient.post('/issuebook', issueForm);
        return response.data;
    } catch (error: any) {
        return { message: error.response?.data?.message || error.message || 'Network error' };
    }
};

export const returnBookAPI = async (bookId: string) => {
    try {
        const response = await apiClient.post(`/issuebook/return/${bookId}`);
        return response.data;
    } catch (error: any) {
        return { message: error.response?.data?.message || error.message || 'Network error' };
    }
};
