// API service for handling Close CRM integration
// Safely access environment variables with fallbacks
const getEnvVar = (key: string, fallback: string = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback;
  }
  return fallback;
};
// Close CRM API configuration
const CLOSE_API_KEY = getEnvVar('REACT_APP_CLOSE_API_KEY', 'api_1XT1LcIKMlumEiqpW2pq75.633xrvvOD2SI1WcfEOs1XZ');
const CLOSE_API_URL = 'https://api.close.com/api/v1/lead/';
// Proxy URL - replace with your actual proxy service URL if using one
// For example, a Netlify or Vercel serverless function endpoint
const PROXY_URL = getEnvVar('REACT_APP_API_PROXY', '/api/submit-lead');
export interface LeadData {
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  custom?: Record<string, any>;
}
/**
 * Submit a lead to Close CRM
 * This function can use either direct API access (not recommended for production due to CORS)
 * or a proxy service (recommended for production)
 */
export async function submitLead(leadData: LeadData) {
  console.log('🚀 submitLead called with:', leadData);
  try {
    // Format the data according to Close CRM's API requirements
    const payload = {
      nombre: leadData.nombre,
      apellidos: leadData.apellidos,
      correo: leadData.correo,
      telefono: leadData.telefono
    };
    console.log('📦 Payload prepared:', payload);
    // Determine if we should use the proxy or direct API access
    // Force proxy usage in production to avoid CORS issues
    const useProxy = getEnvVar('REACT_APP_USE_API_PROXY', 'true') === 'true';
    console.log('🔄 Using proxy:', useProxy, 'URL:', PROXY_URL);
    
    if (useProxy) {
      // Use proxy service (recommended for production)
      console.log('📡 Making request to proxy...');
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Proxy API Error:', response.status, errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText };
        }
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('✅ Success response:', result);
      return result;
    } else {
      // Direct API access (not recommended for production due to CORS)
      const response = await fetch(CLOSE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${CLOSE_API_KEY}:`)
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit lead to Close CRM');
      }
      return await response.json();
    }
  } catch (error) {
    console.error('💥 Error submitting lead:', error);
    console.error('💥 Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error
    });
    throw error;
  }
}
/**
 * Track lead conversion events (optional)
 * This can be used to track form submissions, button clicks, etc.
 */
export function trackLeadEvent(eventName: string, data: Record<string, any> = {}) {
  try {
    // You can integrate with analytics services here
    console.log(`[TRACK] ${eventName}`, data);
    // Example: if you have Google Analytics or other tracking service
    // if (window.gtag) {
    //   window.gtag('event', eventName, data)
    // }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}