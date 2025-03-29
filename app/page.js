
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, RefreshCw, Server } from 'lucide-react';
import DataCard from '@/components/DataCard';
import Header from '@/components/Header';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/data`);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />
      
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Data from Server</h2>
          <button 
            onClick={fetchData}
            className="btn-primary flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Refresh
          </button>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary-500 animate-spin mb-4" />
            <p className="text-gray-600">Loading data...</p>
          </div>
        ) : error ? (
          <div className="card bg-red-50 border border-red-100">
            <div className="flex items-start gap-3">
              <Server className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 mb-1">Connection Error</h3>
                <p className="text-red-600 text-sm">{error}</p>
                <p className="text-red-600 text-xs mt-2">
                  Make sure your backend server is running and environment variables are set correctly.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {data && data.items ? (
              data.items.map((item, index) => (
                <DataCard key={item._id || index} item={item} />
              ))
            ) : (
              <div className="card">
                <p className="text-gray-600 text-center py-4">No data available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
