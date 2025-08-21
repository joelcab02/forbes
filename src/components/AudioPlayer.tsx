import React from 'react';
import { PlayIcon } from 'lucide-react';
export function AudioPlayer() {
  return <div className="mb-8">
      <div className="uppercase text-sm font-semibold mb-2">
        Escuchar el resumen
      </div>
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
        <button className="bg-black text-white rounded-full p-2">
          <PlayIcon size={24} />
        </button>
        <div className="flex-1">
          <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <div className="absolute left-0 top-0 h-full w-[5%] bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="text-sm text-gray-600 flex gap-2">
          <span>00:00</span>
          <span>/</span>
          <span>00:43</span>
        </div>
      </div>
    </div>;
}