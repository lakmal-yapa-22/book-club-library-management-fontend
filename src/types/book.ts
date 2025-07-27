


// types/book.ts
export interface Books {
    id: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publishDate: string;
    category: string;
    status: 'Available' | 'Borrowed';
}

export interface NewBook {
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publishDate: string;
    category: string;
}