
// table/bookTable.tsx
import React from 'react';
import type {Books} from '../types/book';
import { Edit, Trash2, Book, XCircle } from 'lucide-react';

interface BookTableProps {
    books: Books[];
    filteredBooks: Books[];
    loading: boolean;
    onEdit: (book: Books) => void;
    onDelete: (id: string) => void;
    error?: string;
}

const BookTable: React.FC<BookTableProps> = ({ books, filteredBooks, loading, onEdit, onDelete, error }) => {
    if (loading) {
        return (
            <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
                <p className="text-lg text-gray-600 font-medium">Loading your library...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center">
                    <XCircle className="h-5 w-5 mr-3" />
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">ISBN</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Publisher</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {filteredBooks.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="px-6 py-12 text-center">
                            <Book className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-lg text-gray-500 font-medium">
                                {books.length === 0 ? 'No books found. Add your first book!' : 'No books match your search criteria'}
                            </p>
                        </td>
                    </tr>
                ) : (
                    filteredBooks.map((book, index) => (
                        <tr
                            key={book.id}
                            className={`hover:bg-blue-50/50 transition-all duration-200 ${
                                index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
                            }`}
                        >
                            <td className="px-6 py-4 text-sm text-gray-900 font-mono font-semibold">{book.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{book.isbn}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{book.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{book.author}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{book.publisher}</td>
                            <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                    {book.category}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                  <span
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                          book.status === 'Available'
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-red-100 text-red-700 border border-red-200'
                      }`}
                  >
                    {book.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => onEdit(book)}
                                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-lg transition-all"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(book.id)}
                                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-100 rounded-lg transition-all"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;
