// tables/dashboardTables.tsx
import React from 'react';
import { BookOpen, Users, Book, AlertCircle } from 'lucide-react';
import type {IssuedBook} from "../types/issueBook.ts";


interface DashboardStatsProps {
    totalBooks: number;
    totalReaders: number;
    totalIssued: number;
    overdue: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
                                                                  totalBooks,
                                                                  totalReaders,
                                                                  totalIssued,
                                                                  overdue,
                                                              }) => (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-white border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-green-800 font-semibold mb-2'>Total Books</h3>
                    <p className='text-3xl font-bold text-green-600'>{totalBooks}</p>
                </div>
                <Book className='text-green-400' size={24} />
            </div>
        </div>

        <div className='bg-white border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-green-800 font-semibold mb-2'>Readers</h3>
                    <p className='text-3xl font-bold text-green-600'>{totalReaders}</p>
                </div>
                <Users className='text-green-400' size={24} />
            </div>
        </div>

        <div className='bg-white border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-green-800 font-semibold mb-2'>Issued</h3>
                    <p className='text-3xl font-bold text-green-600'>{totalIssued}</p>
                </div>
                <BookOpen className='text-green-400' size={24} />
            </div>
        </div>

        <div className='bg-white border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-green-800 font-semibold mb-2'>Overdue</h3>
                    <p className={`text-3xl font-bold ${overdue > 0 ? 'text-red-600' : 'text-green-600'}`}>{overdue}</p>
                </div>
                <AlertCircle className={`${overdue > 0 ? 'text-red-400' : 'text-green-400'}`} size={24} />
            </div>
        </div>
    </div>
);

interface DueDatesListProps {
    issuedBooks: IssuedBook[];
    formatDate: (dateString: string) => string;
}

export const DueDatesList: React.FC<DueDatesListProps> = ({ issuedBooks, formatDate }) => {
    const notReturnedBooks = issuedBooks.filter(issue => issue.status === 'Not Returned').slice(0, 5);
    return (
        <div className='mt-6 pt-4 border-t border-green-200'>
            <h4 className='font-semibold text-green-800 mb-3'>Due Dates</h4>
            <div className='space-y-2 max-h-40 overflow-y-auto'>
                {notReturnedBooks.length > 0 ? (
                    notReturnedBooks.map(issue => {
                        const dueDate = new Date(issue.dueDate);
                        const isOverdue = dueDate < new Date();
                        return (
                            <div key={issue._id} className='flex items-center space-x-2 text-sm'>
                                <div className={`w-2 h-2 rounded-full ${isOverdue ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                <span className={`text-gray-700 ${isOverdue ? 'text-red-700' : ''}`}>
                  {issue.book?.title
                      ? (issue.book.title.length > 20 ? issue.book.title.substring(0, 20) + '...' : issue.book.title)
                      : 'Book'} - {formatDate(issue.dueDate)}
                </span>
                            </div>
                        );
                    })
                ) : (
                    <p className='text-gray-500 text-sm'>No pending returns</p>
                )}
            </div>
        </div>
    );
};
