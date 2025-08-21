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
  name: string;
  email: string;
  phone: string;
  [key: string]: any; // Allow for additional custom fields
}
/**
 * Submit a lead to Close CRM
 * This function can use either direct API access (not recommended for production due to CORS)
 * or a proxy service (recommended for production)
 */
export async function submitLead(leadData: LeadData) {
  try {
    // Format the data according to Close CRM's API requirements
    const payload = {
      name: leadData.name,
      contacts: [{
        emails: [{
          email: leadData.email,
          type: 'office'
        }],
        phones: [{
          phone: leadData.phone,
          type: 'office'
        }]
      }],
      custom: {
        source: 'CFE Program Website',
        campaign: 'Programa de Bonos Ciudadanos CFE',
        landing_page: window.location.href,
        ...leadData.custom // Allow passing additional custom fields
      }
    };
    // Determine if we should use the proxy or direct API access
    const useProxy = getEnvVar('REACT_APP_USE_API_PROXY') === 'true';
    if (useProxy) {
      // Use proxy service (recommended for production)
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit lead');
      }
      return await response.json();
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
    console.error('Error submitting lead:', error);
    // For development fallback - simulate success even if the API call fails
    const isDevelopment = getEnvVar('NODE_ENV', 'development') === 'development';
    if (isDevelopment) {
      console.warn('Development mode: Simulating successful lead submission');
      return {
        id: 'simulated_lead_id',
        success: true
      };
    }
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