export interface BookDetails {
    id: string;
    title: string;
    author: string;
    isbn: string;
}

export interface ReaderDetails {
    id: string;
    name: string;
    phone?: string;
    email?: string;
}

export interface IssuedBook {
    _id: string;
    id: string; // Issue record ID
    status: 'Returned' | 'Not Returned';
    dueDate: string; // ISO date string
    book?: BookDetails;
    reader?: ReaderDetails;
}
