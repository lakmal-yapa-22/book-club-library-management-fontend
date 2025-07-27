import type { Books, NewBook } from "../types/book";
import apiClient from "./apiClient";

export const fetchBooks = async (): Promise<Books[]> => {
    const response = await apiClient.get("/book");
    return response.data;
};

export const createBook = async (book: NewBook): Promise<Books> => {
    const response = await apiClient.post("/book", book);
    return response.data;
};

export const updateBook = async (id: string, book: Partial<Books>): Promise<Books> => {
    const response = await apiClient.put(`/book/${id}`, book);
    return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
    await apiClient.delete(`/book/${id}`);
};
