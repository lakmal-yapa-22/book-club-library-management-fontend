
// forms/bookForm.tsx
import React from 'react';
import type {Books, NewBook} from '../types/book.ts';
import { Book, User, Building, Calendar, Plus, Edit} from 'lucide-react';

interface BookFormProps {
    formData: NewBook;
    submitting: boolean;
    editingBook: Books | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ formData, submitting, editingBook, onChange, onSubmit, onCancel }) => {
    return (
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                {editingBook ? <Edit className="mr-3 h-6 w-6" /> : <Plus className="mr-3 h-6 w-6" />}
                {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['isbn', 'title', 'author', 'publisher', 'publishDate', 'category'].map((field, idx) => (
                    <div key={idx}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {field === 'author' ? <User className="inline h-4 w-4 mr-1" /> :
                                field === 'publisher' ? <Building className="inline h-4 w-4 mr-1" /> :
                                    field === 'publishDate' ? <Calendar className="inline h-4 w-4 mr-1" /> :
                                        <Book className="inline h-4 w-4 mr-1" />}
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === 'publishDate' ? 'date' : 'text'}
                            name={field}
                            value={formData[field as keyof NewBook]}
                            onChange={onChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder={`Enter ${field}`}
                            required
                        />
                    </div>
                ))}
            </div>
            <div className="flex gap-4 mt-8">
                <button
                    onClick={onSubmit}
                    disabled={submitting}
                    className={`bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition-all duration-200 shadow-lg flex items-center ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {submitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                        </>
                    ) : (
                        <>
                            {editingBook ? <Edit className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                            {editingBook ? 'Update Book' : 'Add Book'}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-all duration-200 shadow-md"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BookForm;