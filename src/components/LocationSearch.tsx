import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationSearchProps {
  setLocation: (location: string) => void;
}

export default function LocationSearch({ setLocation }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
        <MapPin className="h-6 w-6 text-blue-500 mr-2" />
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Enter your destination"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button
          className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}