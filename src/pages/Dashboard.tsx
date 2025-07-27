import { useState, useEffect } from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';

import DashBoardForm from '../forms/dashBoardForm';
import { DashboardStats, DueDatesList } from '../tables/dashboardTable'; // removed .tsx
import { fetchDashboardData } from '../services/dashboardService';
import type { IssuedBook } from "../types/issueBook";

const DashboardPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);

    const [readers, setReaders] = useState<any[]>([]);  // changed never[] to any[]
    const [books, setBooks] = useState<any[]>([]);      // changed never[] to any[]
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { issuedBooks, readers, books } = await fetchDashboardData();
                setIssuedBooks(issuedBooks.map(book => ({ ...book, id: book._id })) as IssuedBook[]);
                setReaders(readers);
                setBooks(books);
                setError(null);
            } catch (err: unknown) {
                setError('Failed to fetch data from API');
                if (err instanceof Error) {
                    console.error('API Error:', err.message);
                } else {
                    console.error('API Error:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const navigateMonth = (direction: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + direction);
            return newDate;
        });
    };

    const stats = {
        totalBooks: books.length,
        totalReaders: readers.length,
        totalIssued: issuedBooks.length,
        overdue: issuedBooks.filter(issue => {
            if (issue.status !== 'Not Returned') return false;
            const dueDate = new Date(issue.dueDate);
            return dueDate < new Date();
        }).length,
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <div className='min-h-screen bg-white flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4'></div>
                    <p className='text-green-600 text-lg'>Loading Literary Haven...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <div className='max-w-7xl mx-auto p-6'>
                <div className='mb-8 bg-green-50 rounded-lg p-6 border border-green-200'>
                    <div className='flex items-center mb-4'>
                        <div className='flex items-center bg-green-600 text-white p-3 rounded-full mr-4'>
                            <BookOpen size={32} />
                        </div>
                        <div>
                            <h1 className='text-4xl font-bold text-green-800'>Literary Haven</h1>
                            <p className='text-green-600 mt-1 text-lg'>Discover your next great adventure</p>
                        </div>
                    </div>
                    {error && (
                        <div className='bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4'>
                            <div className='flex items-center'>
                                <AlertCircle size={20} className='mr-2' />
                                {error}
                            </div>
                        </div>
                    )}
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2 space-y-6'>
                        <DashboardStats
                            totalBooks={stats.totalBooks}
                            totalReaders={stats.totalReaders}
                            totalIssued={stats.totalIssued}
                            overdue={stats.overdue}
                        />

                        <div className='bg-white border border-green-200 rounded-lg p-6'>
                            <h3 className='text-xl font-semibold text-green-800 mb-4'>Library Introduction</h3>
                            <div className="w-full h-[300px]">
                                <iframe
                                    src="https://www.youtube.com/embed/koyJF6oacMw?autoplay=1&mute=1"
                                    title="Library Introduction Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    <div className='lg:col-span-1'>
                        <DashBoardForm currentDate={currentDate} navigateMonth={navigateMonth} />
                        <DueDatesList issuedBooks={issuedBooks} formatDate={formatDate} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
