import React, { useState } from 'react';
import { ShieldIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitLead, trackLeadEvent } from '../services/api';
export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      // Track form submission attempt
      trackLeadEvent('form_submission_attempt', {
        page: window.location.pathname
      });
      // Submit the lead data to Close CRM
      const result = await submitLead(formData);
      if (result && result.id) {
        // Track successful submission
        trackLeadEvent('form_submission_success', {
          lead_id: result.id
        });
        // Navigate to success page with form data
        navigate('/success', {
          state: {
            leadData: formData,
            leadId: result.id
          }
        });
      } else {
        throw new Error('Failed to submit your information. Please try again.');
      }
    } catch (err) {
      // Track submission error
      trackLeadEvent('form_submission_error', {
        error: err instanceof Error ? err.message : 'Unknown error'
      });
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsSubmitting(false);
    }
  };
  return <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm">
          {error}
        </div>}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input type="text" id="name" name="name" required placeholder="Ingrese su nombre completo" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500" disabled={isSubmitting} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico *
          </label>
          <input type="email" id="email" name="email" required placeholder="ejemplo@correo.com" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500" disabled={isSubmitting} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono celular *
          </label>
          <input type="tel" id="phone" name="phone" required placeholder="10 dígitos (ej. 5512345678)" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500" disabled={isSubmitting} />
        </div>
      </div>
      <div className="mt-6">
        <button type="submit" className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-colors text-sm shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
          {isSubmitting ? 'PROCESANDO...' : 'SOLICITAR INFORMACIÓN'}
        </button>
        <p className="text-xs text-center text-gray-500 mt-2">
          Sin compromiso - Puede cancelar en cualquier momento
        </p>
      </div>
      <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
        <ShieldIcon size={12} className="mr-1" />
        Sus datos están protegidos conforme a la Ley Federal de Protección de
        Datos Personales
      </div>
    </form>;
}