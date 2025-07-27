import React from 'react';
import type {Reader} from '../types/reader.ts';
import { UserPlus, Edit3, X } from 'lucide-react';

type ReaderFormProps = {
    formData: Omit<Reader, 'id' | 'borrowedBooks'>;
    setFormData: React.Dispatch<React.SetStateAction<Omit<Reader, 'id' | 'borrowedBooks'>>>;
    onSubmit: () => void;
    onCancel: () => void;
    loading: boolean;
    editingReader: Reader | null;
};

const ReaderForm: React.FC<ReaderFormProps> = ({
                                                   formData,
                                                   setFormData,
                                                   onSubmit,
                                                   onCancel,
                                                   loading,
                                                   editingReader,
                                               }) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-emerald-100">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-2 rounded-xl">
                                {editingReader ? (
                                    <Edit3 className="w-6 h-6 text-white" />
                                ) : (
                                    <UserPlus className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingReader ? 'Edit Reader' : 'Add New Reader'}
                            </h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-emerald-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50/30 transition-all"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-emerald-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50/30 transition-all"
                                    placeholder="Enter email address"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-emerald-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50/30 transition-all"
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-emerald-700 mb-2">Membership ID</label>
                                <input
                                    type="text"
                                    value={formData.memberShipId}
                                    onChange={(e) => setFormData({ ...formData, memberShipId: e.target.value })}
                                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50/30 transition-all"
                                    placeholder="Enter membership ID"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-emerald-700 mb-2">Address</label>
                            <textarea
                                rows={3}
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50/30 transition-all"
                                placeholder="Enter full address"
                            />
                        </div>

                        <div className="flex items-center bg-emerald-50 p-4 rounded-xl">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-5 h-5 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                            />
                            <label htmlFor="isActive" className="ml-3 text-sm font-semibold text-emerald-700">
                                Active Member
                            </label>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button
                                onClick={onSubmit}
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 px-6 rounded-xl disabled:opacity-50 transition-all font-semibold shadow-lg transform hover:scale-105"
                            >
                                {loading ? 'Saving...' : editingReader ? 'Update Reader' : 'Create Reader'}
                            </button>
                            <button
                                onClick={onCancel}
                                className="px-6 py-3 border border-emerald-300 text-emerald-700 rounded-xl hover:bg-emerald-50 transition-all font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReaderForm;
