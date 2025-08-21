// This file is an example of a serverless function that could be deployed
// to Netlify, Vercel, or similar platforms to handle the Close CRM API calls
// This helps avoid CORS issues and keeps your API keys secure
// Example for a Netlify function (save as /netlify/functions/submit-lead.js)
// For actual implementation, deploy this as a serverless function
exports.handler = async function (event, context) {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({
          message: 'Method Not Allowed'
        })
      };
    }
    // Parse the incoming request body
    const data = JSON.parse(event.body);
    // Get the Close API key from environment variables
    const CLOSE_API_KEY = process.env.CLOSE_API_KEY;
    if (!CLOSE_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Server configuration error'
        })
      };
    }
    // Make the request to Close CRM
    const response = await fetch('https://api.close.com/api/v1/lead/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${CLOSE_API_KEY}:`).toString('base64')
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          message: 'Error from Close CRM API',
          error: responseData.error || 'Unknown error'
        })
      };
    }
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify(responseData)
    };
  } catch (error) {
    console.error('Server Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error'
      })
    };
  }
};