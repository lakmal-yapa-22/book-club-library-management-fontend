import apiClient from "./apiClient.ts";
import type {Reader} from "../types/reader.ts";
import type {Books} from "../types/book.ts";

export interface IssuedBook {
    _id: string;
    status: string;
    dueDate: string;
    book?: { title?: string };
}


export const fetchDashboardData = async (): Promise<{
    issuedBooks: IssuedBook[];
    readers: Reader[];
    books: Books[];
}> => {
    try {
        // Using axios all to send concurrent requests
        const [issuedResponse, readersResponse, booksResponse] = await Promise.all([
            apiClient.get('/issuebook'),
            apiClient.get('/reader'),
            apiClient.get('/book'),
        ]);

        // axios responses have data property containing the response body
        return {
            issuedBooks: issuedResponse.data.data || [],
            readers: readersResponse.data || [],
            books: booksResponse.data || [],
        };
    } catch (error) {
        // You can optionally process or log error here
        throw new Error('Failed to fetch one or more API endpoints');
    }
};
