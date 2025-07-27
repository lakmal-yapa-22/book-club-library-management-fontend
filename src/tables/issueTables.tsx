import React, { useState } from 'react';
import type { IssuedBook } from '../types/issueBook.ts'; // ඔයාගේ types එකට අනුව වෙනස් කරන්න
import { User, Phone, Mail, CheckCircle, XCircle, Clock, Send } from 'lucide-react';
import axios from 'axios';
import Alert from '../components/Alert.tsx'; // ඔයාට alert component එකක් තියෙනවා නම්

type Props = {
    issuedBooks: IssuedBook[];
};

const IssueTable: React.FC<Props> = ({ issuedBooks }) => {
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSendReminder = async (
        readerEmail: string,
        readerName: string,
        overdueBooks: { title: string; dueDate: string }[]
    ) => {
        try {
            await axios.post('http://localhost:3000/api/notify/send-overdue-email', {
                to: readerEmail,
                readerName,
                books: overdueBooks,
            });
            setAlert({ type: 'success', message: 'Reminder email sent successfully!' });
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to send reminder email.' });
            console.error(error);
        }
    };

    return (
        <>
            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-blue-50 border-b-2 border-blue-200">
                        <th className="text-left p-4 font-semibold text-blue-800">Issue ID</th>
                        <th className="text-left p-4 font-semibold text-blue-800">Book Details</th>
                        <th className="text-left p-4 font-semibold text-blue-800">Reader Details</th>
                        <th className="text-left p-4 font-semibold text-blue-800">Contact Info</th>
                        <th className="text-left p-4 font-semibold text-blue-800">Due Date</th>
                        <th className="text-left p-4 font-semibold text-blue-800">Status</th>
                        <th className="text-left p-4 font-semibold text-blue-800">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {issuedBooks.map((issue) => {
                        const dueDate = new Date(issue.dueDate);
                        const isOverdue = new Date() > dueDate && issue.status === 'Not Returned';
                        const overdueBookInfo = {
                            title: issue.book?.title || 'Unknown',
                            dueDate: dueDate.toDateString(),
                        };

                        return (
                            <tr
                                key={issue._id}
                                className={`border-b border-gray-200 hover:bg-gray-50 ${
                                    issuedBooks.indexOf(issue) % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                }`}
                            >
                                <td className="p-4 font-medium text-gray-900">{issue.id}</td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{issue.book?.title || 'N/A'}</div>
                                    <div className="text-sm text-gray-600">By: {issue.book?.author || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">ISBN: {issue.book?.isbn || 'N/A'}</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900 flex items-center">
                                        <User className="w-4 h-4 mr-1 text-blue-600" />
                                        {issue.reader?.name || issue.reader?.id || 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-600">ID: {issue.reader?.id || 'N/A'}</div>
                                </td>
                                <td className="p-4">
                                    {issue.reader?.phone ? (
                                        <div className="text-sm text-gray-700 mb-1 flex items-center">
                                            <Phone className="w-3 h-3 mr-1 text-blue-600" />
                                            {issue.reader.phone}
                                        </div>
                                    ) : null}
                                    {issue.reader?.email ? (
                                        <div className="text-sm text-gray-700 flex items-center">
                                            <Mail className="w-3 h-3 mr-1 text-blue-600" />
                                            {issue.reader.email}
                                        </div>
                                    ) : null}
                                    {!issue.reader?.phone && !issue.reader?.email && (
                                        <span className="text-sm text-gray-400">No contact info</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                                        {dueDate.toLocaleDateString()}
                                    </div>
                                    {isOverdue && <div className="text-xs text-red-500">Overdue</div>}
                                </td>
                                <td className="p-4">
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            issue.status === 'Returned'
                                ? 'bg-green-100 text-green-800'
                                : isOverdue
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                      {issue.status === 'Returned' ? (
                          <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Returned
                          </>
                      ) : isOverdue ? (
                          <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Overdue
                          </>
                      ) : (
                          <>
                              <Clock className="w-3 h-3 mr-1" />
                              Issued
                          </>
                      )}
                    </span>
                                </td>
                                <td className="p-4">
                                    {isOverdue && issue.reader?.email && (
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center text-xs"
                                            onClick={() =>
                                                handleSendReminder(issue.reader?.email || '', issue.reader?.name || 'Unknown', [
                                                    overdueBookInfo,
                                                ])
                                            }
                                        >
                                            <Send className="w-3 h-3 mr-1" />
                                            Send Reminder
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default IssueTable;
