import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, LayoutDashboard, Users, BookOpenCheck } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/${itemId}`);
    }
    console.log(`Navigating to ${itemId}`);
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className='w-5 h-5' />,
    },
    {
      id: "book",
      label: "Books",
      icon: <BookOpen className='w-5 h-5' />,
    },
    {
      id: "reader",
      label: "Readers",
      icon: <Users className='w-5 h-5' />,
    },
    {
      id: "issuebook",
      label: "Issue Book",
      icon: <BookOpenCheck className='w-5 h-5' />,
    },
  ];

  return (
      <div className='bg-gradient-to-b from-emerald-900 via-green-800 to-emerald-900 text-white w-64 min-h-screen relative overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-xl transform translate-x-16 -translate-y-16'></div>
        <div className='absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl transform -translate-x-12 translate-y-12'></div>

        <div className='relative z-10 p-6'>
          {/* Header */}
          <div className='mb-8 text-center'>
            <div className='flex items-center justify-center mb-3'>
              <div className='bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg'>
                <BookOpen className='w-8 h-8 text-white' />
              </div>
            </div>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent'>
              Literary Haven
            </h1>
            <p className='text-green-200 text-sm mt-1'>Discover your next great adventure</p>
          </div>

          {/* Navigation */}
          <nav>
            <ul className='space-y-2'>
              {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group relative overflow-hidden ${
                            activeItem === item.id
                                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25 transform scale-105"
                                : "text-green-200 hover:text-white hover:bg-green-800/50 hover:transform hover:scale-102"
                        }`}
                    >
                      {/* Active item background glow */}
                      {activeItem === item.id && (
                          <div className='absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-sm'></div>
                      )}

                      <span className={`flex-shrink-0 relative z-10 transition-transform duration-300 ${
                          activeItem === item.id ? 'text-white' : 'text-green-300 group-hover:text-emerald-300'
                      }`}>
                    {item.icon}
                  </span>
                      <span className='font-medium relative z-10'>{item.label}</span>

                      {/* Active indicator */}
                      {activeItem === item.id && (
                          <div className='absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse'></div>
                      )}
                    </button>
                  </li>
              ))}
            </ul>
          </nav>

          {/* User section */}
          <div className='mt-12 pt-6 border-t border-green-700/50'>
            <div className='flex items-center space-x-3 px-4 py-3 rounded-xl bg-green-800/30 backdrop-blur-sm'>
              <div className='w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-sm font-bold'>
                A
              </div>
              <div className='flex-1'>
                <p className='font-medium text-white text-sm'>Admin User</p>
                <p className='text-green-200 text-xs'>Library Staff</p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className='mt-8 text-center'>
            <p className='text-xs text-green-400'>
              © 2025 Book Club Library
            </p>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
