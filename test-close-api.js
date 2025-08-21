// Test Close CRM API connection
const API_KEY = 'api_1XT1LcIKMlumEiqpW2pq75.633xrvvOD2SI1WcfEOs1XZ';
const API_URL = 'https://api.close.com/api/v1/lead/';

const testPayload = {
  name: 'Test Lead',
  contacts: [{
    emails: [{
      email: 'test@example.com',
      type: 'office'
    }],
    phones: [{
      phone: '+1234567890',
      type: 'office'
    }]
  }]
};

console.log('Testing Close CRM API...');
console.log('API Key:', API_KEY.substring(0, 10) + '...');
console.log('Payload:', JSON.stringify(testPayload, null, 2));

fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(`${API_KEY}:`)
  },
  body: JSON.stringify(testPayload)
})
.then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  return response.text();
})
.then(data => {
  console.log('Response body:', data);
})
.catch(error => {
  console.error('Error:', error);
});
