import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
export function RelatedArticles() {
  return <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-red-600 pb-2 inline-block">
        MÁS COBERTURA
      </h2>
      <div className="relative">
        <div className="space-y-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm p-4 border-l-2 border-red-600">
            <h3 className="font-bold text-lg">
              La transformación digital acelera el crecimiento de PyMEs en
              México
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Las pequeñas y medianas empresas que adoptan tecnologías digitales
              crecen hasta un 30% más rápido
            </p>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm p-4 border-l-2 border-red-600">
            <h3 className="font-bold text-lg">
              Inversiones en tecnología financiera alcanzan récord en 2025
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              El sector fintech mexicano atrae más de 2,000 millones de dólares
              en nuevas inversiones
            </p>
          </div>
        </div>
        <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-red-600 hover:text-white transition-colors">
            <ChevronLeftIcon size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-red-600 hover:text-white transition-colors">
            <ChevronRightIcon size={24} />
          </button>
        </div>
      </div>
    </div>;
}