import React from 'react';
import { Clock } from 'lucide-react';

type Props = {
    book: string;
    reader: string;
    dueDate: string;
    onChange: (field: string, value: string) => void;
    onSubmit: () => void;
    loading: boolean;
    minDate: string;
};

const IssueBookForm: React.FC<Props> = ({ book, reader, dueDate, onChange, onSubmit, loading, minDate }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Issue Book</h2>
            <div className="space-y-6">
                <input
                    type="text"
                    value={book}
                    onChange={(e) => onChange('book', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter Book ID"
                    required
                />
                <input
                    type="text"
                    value={reader}
                    onChange={(e) => onChange('reader', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter Reader ID"
                    required
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => onChange('dueDate', e.target.value)}
                    min={minDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                />
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Clock className="w-4 h-4 inline mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Issue Book'
                    )}
                </button>
            </div>
        </div>
    );
};

export default IssueBookForm;
