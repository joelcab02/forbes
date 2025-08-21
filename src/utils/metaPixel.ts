// Meta Pixel utilities for tracking events
declare global {
  interface Window {
    fbq: any;
  }
}

const PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID || '3615656772063103';

// Initialize Meta Pixel
export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;

  // Check if pixel is already loaded
  if (window.fbq) return;

  // Create fbq function
  window.fbq = function() {
    if (window.fbq.callMethod) {
      window.fbq.callMethod.apply(window.fbq, arguments);
    } else {
      window.fbq.queue.push(arguments);
    }
  };

  if (!window.fbq.queue) {
    window.fbq.queue = [];
  }

  // Load the pixel script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  // Initialize pixel
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');

  console.log('Meta Pixel initialized:', PIXEL_ID);
};

// Track page view
export const trackPageView = () => {
  if (window.fbq) {
    window.fbq('track', 'PageView');
    console.log('Meta Pixel: PageView tracked');
  }
};

// Track form view
export const trackViewContent = (contentType: string = 'form') => {
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_type: contentType,
      content_name: 'CFE Program Registration Form'
    });
    console.log('Meta Pixel: ViewContent tracked');
  }
};

// Track form submission attempt
export const trackInitiateCheckout = () => {
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'CFE Program Lead Form',
      content_category: 'Lead Generation'
    });
    console.log('Meta Pixel: InitiateCheckout tracked');
  }
};

// Track successful lead submission
export const trackLead = (leadData: any) => {
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'CFE Program Registration',
      content_category: 'Lead Generation',
      value: 1,
      currency: 'MXN'
    });
    console.log('Meta Pixel: Lead tracked');
  }
};

// Track custom events
export const trackCustomEvent = (eventName: string, parameters: any = {}) => {
  if (window.fbq) {
    window.fbq('trackCustom', eventName, parameters);
    console.log(`Meta Pixel: Custom event '${eventName}' tracked`);
  }
};
