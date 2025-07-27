import React from 'react';
import type {Reader} from '../types/reader.ts';
import { User, Mail, Phone, MapPin, Edit3, Trash2 } from 'lucide-react';

type ReaderTableProps = {
    readers: Reader[];
    onEdit: (reader: Reader) => void;
    onDelete: (id: string) => void;
};

const ReaderTable: React.FC<ReaderTableProps> = ({ readers, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gradient-to-r from-emerald-50 to-green-50">
                <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Reader</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Membership</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Status</th>

                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white/60 divide-y divide-emerald-100">
                {readers.map((reader) => (
                    <tr key={reader.id} className="hover:bg-emerald-50/50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-bold text-gray-900">{reader.name}</div>
                                    <div className="text-sm text-emerald-600 font-medium">ID: {reader.id}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-900">
                                    <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                                    <span className="font-medium">{reader.email}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <Phone className="w-4 h-4 mr-2 text-green-500" />
                                    <span>{reader.phone}</span>
                                </div>
                                <div className="flex items-start text-sm text-gray-700">
                                    <MapPin className="w-4 h-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span className="truncate max-w-xs">{reader.address}</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="bg-emerald-100 px-3 py-1 rounded-full inline-block">
                                <span className="text-sm font-bold text-emerald-800">{reader.memberShipId}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                <span
                    className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                        reader.isActive
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                            : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800'
                    }`}
                >
                  {reader.isActive ? '✓ Active' : '✗ Inactive'}
                </span>
                        </td>

                        <td className="px-6 py-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(reader)}
                                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white p-2 rounded-lg transition-all transform hover:scale-110 shadow-md"
                                    title="Edit Reader"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(reader.id)}
                                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-2 rounded-lg transition-all transform hover:scale-110 shadow-md"
                                    title="Delete Reader"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReaderTable;
