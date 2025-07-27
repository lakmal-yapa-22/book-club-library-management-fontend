// pages/BookPage.tsx
import React, { useEffect, useState } from 'react';
import type { Books, NewBook } from '../types/book.ts';
import { fetchBooks, createBook, updateBook, deleteBook } from '../services/bookService.ts';
import BookForm from '../forms/bookForm.tsx';
import BookTable from '../tables/bookTables.tsx';
import { RefreshCw, Plus, Book, CheckCircle, XCircle, X, Search, Filter } from 'lucide-react';

interface CustomToast {
    id: string;
    type: 'success' | 'error';
    message: string;
}

const BookPage: React.FC = () => {
    const [books, setBooks] = useState<Books[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Books[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>('');
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Books | null>(null);
    const [formData, setFormData] = useState<NewBook>({
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        publishDate: '',
        category: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [toasts, setToasts] = useState<CustomToast[]>([]);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [bookIdToDelete, setBookIdToDelete] = useState<string | null>(null);

    const showToast = (type: 'success' | 'error', message: string) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const isEmpty = Object.values(formData).some((v) => v.trim() === '');
        if (isEmpty) return showToast('error', 'Please fill all fields');
        setSubmitting(true);
        try {
            if (editingBook) {
                await updateBook(editingBook.id, formData);
                showToast('success', 'Book updated successfully');
            } else {
                await createBook(formData);
                showToast('success', 'Book created successfully');
            }
            cancelEdit();

            setLoading(true);
            const updatedBooks = await fetchBooks();
            setBooks(updatedBooks);
            setLoading(false);
        } catch (err: unknown) {
            const error = err as Error;
            showToast('error', error.message || 'Error occurred');
            setLoading(false);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setBookIdToDelete(id);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!bookIdToDelete) return;
        setShowDeleteConfirm(false);
        try {
            await deleteBook(bookIdToDelete);
            const updatedBooks = await fetchBooks();
            setBooks(updatedBooks);
            showToast('success', 'Book deleted successfully');
        } catch (err: unknown) {
            const error = err as Error;
            showToast('error', error.message || 'Delete failed');
        }
        setBookIdToDelete(null);
    };

    const startEdit = (book: Books) => {
        setEditingBook(book);
        setFormData({ ...book, publishDate: book.publishDate.split('T')[0] });
        setShowForm(true);
    };

    const cancelEdit = () => {
        setEditingBook(null);
        setShowForm(false);
        setFormData({ isbn: '', title: '', author: '', publisher: '', publishDate: '', category: '' });
    };

    useEffect(() => {
        setLoading(true);
        fetchBooks()
            .then((data) => setBooks(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let filtered = books;
        if (searchTerm)
            filtered = filtered.filter(
                (b) =>
                    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.isbn.includes(searchTerm)
            );
        if (statusFilter !== 'All') filtered = filtered.filter((b) => b.status === statusFilter);
        if (categoryFilter !== 'All') filtered = filtered.filter((b) => b.category === categoryFilter);
        setFilteredBooks(filtered);
    }, [books, searchTerm, statusFilter, categoryFilter]);

    const stats = {
        total: books.length,
        available: books.filter((b) => b.status === 'Available').length,
        borrowed: books.filter((b) => b.status === 'Borrowed').length,
        categories: [...new Set(books.map((b) => b.category))].length,
    };

    const uniqueCategories = [...new Set(books.map((b) => b.category))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="p-6 max-w-7xl mx-auto relative">
                {/* Enhanced Toasts */}
                <div className="fixed top-4 right-4 space-y-2 z-50">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={`p-4 rounded-xl text-white shadow-lg flex items-center transition-all duration-300 ${
                                toast.type === 'success'
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                            }`}
                        >
                            {toast.type === 'success' ? (
                                <CheckCircle className="w-5 h-5 mr-3" />
                            ) : (
                                <XCircle className="w-5 h-5 mr-3" />
                            )}
                            <span className="flex-1 font-medium">{toast.message}</span>
                            <button
                                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                                className="ml-3 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Enhanced Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-600 rounded-2xl shadow-lg">
                            <Book className="h-10 w-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-green-800">
                                Library Management
                            </h1>
                            <p className="text-gray-600 text-lg">Manage your book collection with ease</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium"
                        >
                            <Plus className="mr-2 h-5 w-5" /> Add Book
                        </button>
                        <button
                            onClick={() => {
                                setLoading(true);
                                fetchBooks()
                                    .then((data) => setBooks(data))
                                    .catch((err) => setError(err.message))
                                    .finally(() => setLoading(false));
                            }}
                            className="flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl border border-green-200 hover:bg-green-50 hover:border-green-300 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium"
                        >
                            <RefreshCw className="mr-2 h-5 w-5" /> Refresh
                        </button>
                    </div>
                </div>

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Books</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Book className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Available</p>
                                <p className="text-3xl font-bold text-emerald-600">{stats.available}</p>
                            </div>
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <CheckCircle className="h-6 w-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Borrowed</p>
                                <p className="text-3xl font-bold text-red-500">{stats.borrowed}</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-xl">
                                <XCircle className="h-6 w-6 text-red-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Categories</p>
                                <p className="text-3xl font-bold text-green-600">{stats.categories}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Filter className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Filters */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by title, author or ISBN"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-medium"
                        >
                            <option value="All">All Status</option>
                            <option value="Available">Available</option>
                            <option value="Borrowed">Borrowed</option>
                        </select>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-medium"
                        >
                            <option value="All">All Categories</option>
                            {uniqueCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Book Form Modal */}
                {showForm && (
                    <BookForm
                        formData={formData}
                        submitting={submitting}
                        editingBook={editingBook}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onCancel={cancelEdit}
                    />
                )}

                {/* Book Table with enhanced styling */}
                <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                    <BookTable
                        books={books}
                        filteredBooks={filteredBooks}
                        loading={loading}
                        error={error}
                        onEdit={startEdit}
                        onDelete={handleDeleteClick}
                    />
                </div>

                {/* Enhanced Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-100">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                    <XCircle className="h-8 w-8 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Delete</h2>
                                <p className="text-gray-600 mb-6">Are you sure you want to delete this book? This action cannot be undone.</p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmDelete}
                                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        Delete Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookPage;