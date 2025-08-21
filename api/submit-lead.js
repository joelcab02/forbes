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
    const API_KEY = process.env.CLOSE_API_KEY || 'api_1XT1LcIKMlumEiqpW2pq75.633xrvvOD2SI1WcfEOs1XZ';
    
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
        landing_page: leadData.landing_page || 'https://cfe.forbesespecial.com',
        ...leadData.custom
      }
    };

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
      console.error('Close API Error:', result);
      return res.status(400).json({ error: result.error || 'Failed to submit lead' });
    }

    console.log('Lead created successfully:', result.id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: error.message });
  }
}
