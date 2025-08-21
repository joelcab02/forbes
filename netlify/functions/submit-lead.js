exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const leadData = JSON.parse(event.body);
    const API_KEY = process.env.CLOSE_API_KEY;
    
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
      custom: leadData.custom || {}
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
    
    return {
      statusCode: response.ok ? 200 : 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
