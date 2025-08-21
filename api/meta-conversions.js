// Meta Conversions API serverless function
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventName, eventData, userData } = req.body;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || 'EAAJO8ME5WxwBPGbs3A025fwX6YhhCU3n9zv6wdMRQDGEZBP0eNOWZBROXAAPl3zXfbiqFhEDPfGMxMwqz8GlaCiUx7UfYw8Q1AhJZA1tY5izU2Iv1TrQZAR2MHiamrws4rTPHSQWhZCkjPKJg4xMuD4Y1eDwQjCfNYyUQLurcKzXuf2ofjcnZBXVqjZC6RqYXeZCwgZDZD';
  const PIXEL_ID = '3615656772063103';

  console.log('Meta Conversions API called:', { eventName, eventData, userData });

  try {
    // Hash user data for privacy
    const crypto = require('crypto');
    const hashData = (data) => {
      if (!data) return null;
      return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
    };

    // Prepare the conversion event
    const conversionData = {
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: eventData?.source_url || 'https://cfe.forbesespecial.com',
        user_data: {
          em: userData?.email ? [hashData(userData.email)] : undefined,
          ph: userData?.phone ? [hashData(userData.phone)] : undefined,
          fn: userData?.firstName ? [hashData(userData.firstName)] : undefined,
          ln: userData?.lastName ? [hashData(userData.lastName)] : undefined,
          client_ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          client_user_agent: req.headers['user-agent'],
          fbc: eventData?.fbc || undefined,
          fbp: eventData?.fbp || undefined
        },
        custom_data: {
          content_name: eventData?.content_name || 'CFE Program Lead',
          content_category: eventData?.content_category || 'Lead Generation',
          value: eventData?.value || 1,
          currency: eventData?.currency || 'MXN'
        }
      }]
    };

    // Remove undefined fields
    const cleanData = JSON.parse(JSON.stringify(conversionData));

    console.log('Sending to Meta Conversions API:', JSON.stringify(cleanData, null, 2));

    // Send to Meta Conversions API
    const response = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(cleanData)
    });

    const result = await response.json();
    console.log('Meta Conversions API response:', result);

    if (!response.ok) {
      console.error('Meta Conversions API Error:', result);
      return res.status(500).json({ 
        error: 'Meta Conversions API Error',
        details: result 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Event sent to Meta Conversions API',
      data: result
    });

  } catch (error) {
    console.error('Error sending to Meta Conversions API:', error);
    return res.status(500).json({ 
      error: 'Failed to send conversion event',
      details: error.message 
    });
  }
}
