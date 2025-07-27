// forms/dashBoardForm.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface DashBoardFormProps {
    currentDate: Date;
    navigateMonth: (direction: number) => void;
}

const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    return days;
};

const DashBoardForm: React.FC<DashBoardFormProps> = ({ currentDate, navigateMonth }) => {
    const today = new Date();

    const isToday = (day: number | null) => {
        if (!day) return false;
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div className='bg-white border border-green-200 rounded-lg p-6 sticky top-6'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-semibold text-green-800'>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className='flex space-x-1'>
                    <button onClick={() => navigateMonth(-1)} className='p-1 hover:bg-green-100 rounded'>
                        <ChevronLeft className='text-green-600' size={20} />
                    </button>
                    <button onClick={() => navigateMonth(1)} className='p-1 hover:bg-green-100 rounded'>
                        <ChevronRight className='text-green-600' size={20} />
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-7 gap-1 mb-2'>
                {daysOfWeek.map(day => (
                    <div key={day} className='text-center text-sm font-semibold text-green-700 py-2'>
                        {day}
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-7 gap-1'>
                {getDaysInMonth(currentDate).map((day, index) => (
                    <div
                        key={index}
                        className={`
              text-center py-2 text-sm rounded cursor-pointer transition-colors
              ${day ? 'hover:bg-green-100' : ''}
              ${isToday(day)
                            ? 'bg-green-600 text-white font-bold'
                            : day
                                ? 'text-gray-700 hover:text-green-800'
                                : ''
                        }
            `}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashBoardForm;
