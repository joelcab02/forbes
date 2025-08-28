import React from 'react';
import { ClockIcon, ShareIcon } from 'lucide-react';
export function ArticleHeader() {
  return <div className="mb-6 md:mb-8">
      <div className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 font-medium">
        <span>Portada / </span>
        <span className="text-red-600">Economía Y Finanzas</span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
        Claudia Sheinbaum anuncia un programa histórico con CFE: los ciudadanos
        podrán obtener hasta $40,000 pesos al mes
      </h1>
      <div className="flex items-center justify-between border-b border-t border-gray-200 py-3 mb-4 md:mb-6">
        <div className="flex items-center">
          <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Autor" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <div className="font-medium text-sm md:text-base">
              Por <span className="text-red-600">Redacción Forbes México</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <ClockIcon size={12} className="mr-1" />
              15 de enero, 2025 | 10:23 am
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <ShareIcon size={16} />
          </button>
        </div>
      </div>
      <p className="text-base md:text-lg text-gray-700 mb-6 font-serif">
        La presidenta electa presentó el nuevo Programa de Inversión Ciudadana
        que permite a los mexicanos generar ingresos adicionales con una
        inversión mínima de solo $1,000 pesos.
      </p>
      <div className="mb-6 md:mb-8 relative">
        <img src="/TMV52HO62BCOHNUSWOACYSXL2Y.jpg" alt="Claudia Sheinbaum presentando el programa de inversión de CFE" className="w-full h-auto rounded-sm shadow-md" />
        <div className="text-xs text-gray-500 mt-2 italic">
          Claudia Sheinbaum durante la presentación del nuevo programa de
          inversión de CFE. Foto: Cortesía Presidencia.
        </div>
      </div>
    </div>;
}