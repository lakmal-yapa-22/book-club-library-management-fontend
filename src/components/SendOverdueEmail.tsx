import React, { useState } from 'react';
import axios from 'axios';

const SendOverdueEmail: React.FC = () => {
    const [formData, setFormData] = useState({
        to: '',
        readerName: '',
        bookTitle: '',
        dueDate: '',
    });

    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error' | ''>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            to: formData.to,
            readerName: formData.readerName,
            books: [
                {
                    title: formData.bookTitle,
                    dueDate: formData.dueDate,
                },
            ],
        };

        try {
            const res = await axios.post('http://localhost:3000/api/notify/send-overdue-email', payload);
            setType('success');
            setMessage(res.data.message);
            setFormData({ to: '', readerName: '', bookTitle: '', dueDate: '' }); // Clear form on success
        } catch (error: any) {
            setType('error');
            setMessage(error.response?.data?.message || 'Failed to send email');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-8">
            <h2 className="text-xl font-semibold mb-4">Send Overdue Email</h2>

            {message && (
                <div
                    className={`mb-4 p-3 rounded text-white ${
                        type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="to"
                    placeholder="Reader's Email"
                    value={formData.to}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type="text"
                    name="readerName"
                    placeholder="Reader's Name"
                    value={formData.readerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type="text"
                    name="bookTitle"
                    placeholder="Book Title"
                    value={formData.bookTitle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Send Email
                </button>
            </form>
        </div>
    );
};

export default SendOverdueEmail;
