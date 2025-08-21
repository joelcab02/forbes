import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, RssIcon } from 'lucide-react';
export function Footer() {
  return <footer className="w-full bg-black text-white py-8 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Forbes Logo */}
        <div className="flex justify-center mb-6">
          <img src="/forbes.png" alt="Forbes México" className="h-10" />
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex justify-center gap-x-6 mb-6 text-sm">
          <a href="#" className="hover:text-red-500">
            PORTADA
          </a>
          <a href="#" className="hover:text-red-500">
            ECONOMÍA
          </a>
          <a href="#" className="hover:text-red-500">
            NEGOCIOS
          </a>
          <a href="#" className="hover:text-red-500">
            POLÍTICA
          </a>
          <a href="#" className="hover:text-red-500">
            TECNOLOGÍA
          </a>
          <a href="#" className="hover:text-red-500">
            ESTRATEGIAS
          </a>
          <a href="#" className="hover:text-red-500">
            FORBES LIFE
          </a>
        </div>
        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <a href="#" className="hover:text-red-500 bg-gray-900 p-2 rounded-full">
            <FacebookIcon size={18} />
          </a>
          <a href="#" className="hover:text-red-500 bg-gray-900 p-2 rounded-full">
            <TwitterIcon size={18} />
          </a>
          <a href="#" className="hover:text-red-500 bg-gray-900 p-2 rounded-full">
            <InstagramIcon size={18} />
          </a>
          <a href="#" className="hover:text-red-500 bg-gray-900 p-2 rounded-full">
            <LinkedinIcon size={18} />
          </a>
          <a href="#" className="hover:text-red-500 bg-gray-900 p-2 rounded-full">
            <YoutubeIcon size={18} />
          </a>
        </div>
        {/* Subscribe Button */}
        <div className="flex justify-center mb-8">
          <a href="#" className="bg-red-600 hover:bg-red-700 px-6 py-2 text-center text-white font-bold transition-colors text-sm">
            SUSCRÍBETE A FORBES
          </a>
        </div>
        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 text-xs">
          <a href="#" className="hover:text-red-500">
            Términos y Condiciones
          </a>
          <a href="#" className="hover:text-red-500">
            Aviso de Privacidad
          </a>
          <a href="#" className="hover:text-red-500">
            Declaración de Accesibilidad
          </a>
          <a href="#" className="hover:text-red-500">
            MediaKit
          </a>
          <a href="#" className="hover:text-red-500">
            Directorio
          </a>
          <a href="#" className="hover:text-red-500">
            Contacto
          </a>
        </div>
        {/* Copyright */}
        <div className="text-center text-xs text-gray-500">
          © 2025 Forbes México | Todos los Derechos Reservados
        </div>
      </div>
    </footer>;
}