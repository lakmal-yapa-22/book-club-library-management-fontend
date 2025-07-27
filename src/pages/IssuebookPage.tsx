import { useState, useEffect } from 'react';
import { Book, ArrowLeft, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

import { fetchIssuedBooksAPI, issueBookAPI, returnBookAPI } from '../services/issueBookService';
import type { IssuedBook } from '../types/issueBook';
import IssueBookForm from "../forms/issueBook.tsx";
import IssueTable from "../tables/issueTables.tsx";

const IssueBookPage = () => {
    const [activeTab, setActiveTab] = useState<'issue' | 'return' | 'view'>('issue');
    const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
    const [issueForm, setIssueForm] = useState({ book: '', reader: '', dueDate: '' });
    const [returnBookId, setReturnBookId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const showMessage = (msg: string, type: 'success' | 'error') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };

    const handleChange = (field: string, value: string) => {
        setIssueForm({ ...issueForm, [field]: value });
    };

    const handleIssueBook = async () => {
        if (!issueForm.book || !issueForm.reader || !issueForm.dueDate) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        setLoading(true);
        try {
            const result = await issueBookAPI(issueForm);
            if (result && result.message?.toLowerCase().includes('success')) {
                showMessage('Book issued successfully!', 'success');
                setIssueForm({ book: '', reader: '', dueDate: '' });
                if (activeTab === 'view') fetchIssuedBooks();
            } else {
                showMessage(result.message || 'Issue failed', 'error');
            }
        } catch {
            showMessage('Network error. Try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReturnBook = async () => {
        if (!returnBookId) {
            showMessage('Enter book ID to return', 'error');
            return;
        }
        setLoading(true);
        try {
            const result = await returnBookAPI(returnBookId);
            if (result && result.message?.toLowerCase().includes('success')) {
                showMessage('Book returned successfully!', 'success');
                setReturnBookId('');
                if (activeTab === 'view') fetchIssuedBooks();
            } else {
                showMessage(result.message || 'Return failed', 'error');
            }
        } catch {
            showMessage('Network error. Try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchIssuedBooks = async () => {
        setLoading(true);
        try {
            const response = await fetchIssuedBooksAPI();
            setIssuedBooks(response.data || []);
        } catch {
            showMessage('Failed to fetch data', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'view') fetchIssuedBooks();
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Book className="w-10 h-10 text-green-600 mr-3" />
                        <h1 className="text-4xl font-bold text-gray-800">Library Management System</h1>
                    </div>
                    <p className="text-gray-600">Manage book issues and returns efficiently</p>
                </div>

                {/* Alert */}
                {message && (
                    <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                        messageType === 'success' ? 'bg-green-50 border-green-400 text-green-700' : 'bg-red-50 border-red-400 text-red-700'
                    }`}>
                        <div className="flex items-center">
                            {messageType === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />}
                            {message}
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg shadow-md p-1 flex space-x-1">
                        <button
                            onClick={() => setActiveTab('issue')}
                            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                                activeTab === 'issue' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:text-green-600'
                            }`}
                        >
                            <Book className="w-4 h-4 inline mr-2" /> Issue Book
                        </button>
                        <button
                            onClick={() => setActiveTab('return')}
                            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                                activeTab === 'return' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:text-emerald-600'
                            }`}
                        >
                            <ArrowLeft className="w-4 h-4 inline mr-2" /> Return Book
                        </button>
                        <button
                            onClick={() => setActiveTab('view')}
                            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                                activeTab === 'view' ? 'bg-green-500 text-white shadow-md' : 'text-gray-600 hover:text-green-500'
                            }`}
                        >
                            <Eye className="w-4 h-4 inline mr-2" /> View Issued Books
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className={activeTab === 'view' ? 'max-w-6xl mx-auto' : 'max-w-md mx-auto'}>
                    {activeTab === 'issue' && (
                        <IssueBookForm
                            book={issueForm.book}
                            reader={issueForm.reader}
                            dueDate={issueForm.dueDate}
                            onChange={handleChange}
                            onSubmit={handleIssueBook}
                            loading={loading}
                            minDate={getTomorrowDate()}
                        />
                    )}

                    {activeTab === 'return' && (
                        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Return Book</h2>
                            <div className="space-y-6">
                                <input
                                    type="text"
                                    value={returnBookId}
                                    onChange={(e) => setReturnBookId(e.target.value)}
                                    placeholder="Enter Issue ID"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={handleReturnBook}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-800 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Clock className="w-4 h-4 inline mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Return Book'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'view' && <IssueTable issuedBooks={issuedBooks} />}
                </div>
            </div>
        </div>
    );
};

export default IssueBookPage;
