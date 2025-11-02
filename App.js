import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/data`);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full Stack AWS Deployment</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>{data?.message}</p>
            <p>Server: {data?.server}</p>
            <button onClick={fetchData}>Refresh</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
