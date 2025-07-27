import { useState, useEffect } from 'react';
import type {Reader} from '../types/reader.ts';
import * as readerService from '../services/readerService.ts';
import ReaderForm from '../forms/readerForm.tsx';
import ReaderTable from '../tables/readerTable.tsx';
import Alert from '../components/Alert.tsx';
import { UserPlus, Users, } from 'lucide-react';

import Swal from 'sweetalert2';

const ReaderPage = () => {
    const [readers, setReaders] = useState<Reader[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingReader, setEditingReader] = useState<Reader | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [formData, setFormData] = useState<Omit<Reader, 'id' | 'borrowedBooks'>>({
        name: '',
        email: '',
        phone: '',
        address: '',
        memberShipId: '',
        isActive: true,
    });

    const showAlert = (type: 'success' | 'error', message: string) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 5000);
    };

    const fetchAllReaders = async () => {
        setLoading(true);
        try {
            const data = await readerService.fetchReaders();
            setReaders(data);
        } catch (error) {
            showAlert('error', (error as Error).message || 'Failed to fetch readers');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllReaders();
    }, []);

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            memberShipId: '',
            isActive: true,
        });
        setEditingReader(null);
        setShowForm(false);
    };

    const validateForm = (): boolean => {
        if (!formData.name || formData.name.length < 3) {
            showAlert('error', 'Name must be at least 3 characters long');
            return false;
        }
        if (
            !formData.email ||
            !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.email.toLowerCase())
        ) {
            showAlert('error', 'Invalid email address');
            return false;
        }
        if (!formData.phone || !/^\+?\d{7,15}$/.test(formData.phone)) {
            showAlert('error', 'Invalid phone number');
            return false;
        }
        if (!formData.memberShipId) {
            showAlert('error', 'Membership ID is required');
            return false;
        }
        return true;
    };

    const handleFormSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            if (editingReader) {
                await readerService.updateReader(editingReader.id, formData);
                showAlert('success', 'Reader updated successfully');
            } else {
                await readerService.createReader(formData);
                showAlert('success', 'Reader created successfully');
            }
            await fetchAllReaders();
            resetForm();
        } catch (error) {
            showAlert('error', (error as Error).message || 'Operation failed');
        }
        setLoading(false);
    };

    const handleEdit = (reader: Reader) => {
        setEditingReader(reader);
        setFormData({
            name: reader.name,
            email: reader.email,
            phone: reader.phone,
            address: reader.address,
            memberShipId: reader.memberShipId,
            isActive: reader.isActive,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10B981', // Tailwind's emerald-500
            cancelButtonColor: '#EF4444',  // Tailwind's red-500
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        setLoading(true);
        try {
            await readerService.deleteReader(id);
            await fetchAllReaders();
            Swal.fire({
                title: 'Deleted!',
                text: 'Reader has been deleted.',
                icon: 'success',
                confirmButtonColor: '#10B981',
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: (error as Error).message || 'Delete failed',
                icon: 'error',
                confirmButtonColor: '#EF4444',
            });
        } finally {
            setLoading(false);
        }
    };


    const filteredReaders = readers.filter((reader) =>
        reader.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-20 ">


            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-emerald-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Reader Management</h1>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search readers by name"
                        className="px-4 py-2 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setEditingReader(null);
                            setFormData({
                                name: '',
                                email: '',
                                phone: '',
                                address: '',
                                memberShipId: '',
                                isActive: true,
                            });
                        }}
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-2 px-4 rounded-xl shadow-lg font-semibold transition-transform hover:scale-105"
                    >
                        <UserPlus className="w-5 h-5" /> Add Reader
                    </button>
                </div>
            </header>

            <ReaderTable readers={filteredReaders} onEdit={handleEdit} onDelete={handleDelete} />

            {showForm && (
                <ReaderForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleFormSubmit}
                    onCancel={resetForm}
                    loading={loading}
                    editingReader={editingReader}
                />
            )}
        </div>
        </div>
    );
};

export default ReaderPage;
