import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import type {AlertProps} from '../types/reader.ts';



const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => (
    <div
        className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl max-w-md backdrop-blur-sm ${
            type === 'success'
                ? 'bg-emerald-50/95 border border-emerald-200 text-emerald-800'
                : 'bg-red-50/95 border border-red-200 text-red-800'
        }`}
    >
        <div className="flex items-center gap-3">
            {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="flex-1 font-medium">{message}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-4 h-4" />
            </button>
        </div>
    </div>
);


export default Alert;
