import React from 'react';
import { MenuIcon, SearchIcon } from 'lucide-react';
export function Header() {
  return <header className="w-full bg-black text-white py-3 px-6 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button className="text-white mr-4">
            <MenuIcon size={24} />
          </button>
          <div className="hidden md:flex space-x-5 text-xs font-medium">
            <a href="#" className="hover:text-red-500">
              NEGOCIOS
            </a>
            <a href="#" className="hover:text-red-500">
              ECONOMÍA
            </a>
            <a href="#" className="hover:text-red-500">
              POLÍTICA
            </a>
            <a href="#" className="hover:text-red-500">
              TECNOLOGÍA
            </a>
            <a href="#" className="hover:text-red-500">
              FORBES LIFE
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="/forbes.png" alt="Forbes México" className="h-10 sm:h-12 md:h-14" />
        </div>
        <div className="flex items-center">
          <button className="text-white">
            <SearchIcon size={22} />
          </button>
          <a href="#" className="hidden md:block ml-5 bg-red-600 hover:bg-red-700 px-4 py-1 text-xs font-bold">
            SUSCRÍBETE
          </a>
        </div>
      </div>
    </header>;
}