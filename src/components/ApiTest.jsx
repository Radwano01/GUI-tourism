import React, { useState } from 'react';
import apiService from '../api/apiService';

function ApiTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Testing API call...');
      const response = await apiService.getCountries();
      console.log('API Response:', response);
      setResult(response.data);
    } catch (err) {
      console.error('API Test Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>API Test Component</h3>
      <button onClick={testApi} disabled={loading}>
        {loading ? 'Testing...' : 'Test API Call'}
      </button>
      
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          <strong>Success!</strong> Received {Array.isArray(result) ? result.length : 'data'} items
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ApiTest;
