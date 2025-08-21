export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData = req.body;
    console.log('Received lead data:', JSON.stringify(leadData, null, 2));
    
    const API_KEY = process.env.CLOSE_API_KEY || 'api_1XT1LcIKMlumEiqpW2pq75.633xrvvOD2SI1WcfEOs1XZ';
    console.log('Using API key:', API_KEY.substring(0, 10) + '...');
    
    // Format phone number - ensure it starts with +
    let formattedPhone = leadData.phone;
    if (!formattedPhone.startsWith('+')) {
      // If it's a 10-digit number, assume it's Mexican (+52)
      if (formattedPhone.length === 10) {
        formattedPhone = '+52' + formattedPhone;
      } else {
        formattedPhone = '+' + formattedPhone;
      }
    }
    
    const payload = {
      name: leadData.name,
      contacts: [{
        emails: [{
          email: leadData.email,
          type: 'office'
        }],
        phones: [{
          phone: formattedPhone,
          type: 'office'
        }]
      }],
      custom: {
        source: 'CFE Program Website',
        campaign: 'Programa de Bonos Ciudadanos CFE',
        landing_page: leadData.landing_page || 'https://cfe.forbesespecial.com',
        ...leadData.custom
      }
    };
    
    console.log('Sending payload to Close:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://api.close.com/api/v1/lead/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${API_KEY}:`).toString('base64')
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Close API Error Status:', response.status);
      console.error('Close API Error Response:', JSON.stringify(result, null, 2));
      return res.status(400).json({ 
        error: result.error || 'Failed to submit lead',
        details: result,
        status: response.status 
      });
    }

    console.log('Lead created successfully:', result.id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Server Error:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
}
