export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Received request body:', req.body);

  const { name, email, phone } = req.body;

  // Validate required fields
  if (!name || !email || !phone) {
    console.log('Missing fields:', { name, email, phone });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const API_KEY = 'api_1XT1LcIKMlumEiqpW2pq75.633xrvvOD2SI1WcfEOs1XZ';
  const CLOSE_API_URL = 'https://api.close.com/api/v1/lead/';

  console.log('Attempting to create lead with data:', { name, email, phone });

  // First test API connection
  try {
    console.log('Testing API connection...');
    const testResponse = await fetch('https://api.close.com/api/v1/me/', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${API_KEY}:`).toString('base64')}`
      }
    });
    
    console.log('API test response status:', testResponse.status);
    if (!testResponse.ok) {
      const testError = await testResponse.text();
      console.error('API authentication failed:', testError);
      return res.status(401).json({ 
        error: 'API authentication failed',
        details: testError 
      });
    }
    
    const userInfo = await testResponse.json();
    console.log('API connection successful, user:', userInfo.email);
  } catch (authError) {
    console.error('API connection test failed:', authError);
    return res.status(500).json({ 
      error: 'API connection failed',
      details: authError.message 
    });
  }

  try {
    const leadData = {
      name: `${name} - CFE Program`,
      contacts: [{
        name: name,
        emails: [{
          email: email,
          type: 'office'
        }],
        phones: [{
          phone: phone,
          type: 'office'
        }]
      }]
    };

    console.log('Sending to Close CRM:', JSON.stringify(leadData, null, 2));

    const response = await fetch(CLOSE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${API_KEY}:`).toString('base64')}`
      },
      body: JSON.stringify(leadData)
    });

    console.log('Close CRM response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Close CRM API Error:', response.status, errorText);
      return res.status(500).json({ 
        error: 'Close CRM API Error',
        status: response.status,
        details: errorText 
      });
    }

    const result = await response.json();
    console.log('Lead created successfully:', result);
    
    return res.status(200).json({ 
      success: true, 
      leadId: result.id,
      message: 'Lead created successfully',
      data: result
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    return res.status(500).json({ 
      error: 'Failed to create lead',
      details: error.message 
    });
  }
}
