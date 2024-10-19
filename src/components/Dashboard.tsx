import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { MapPin, Utensils, Car, User, Hotel, Clock } from 'lucide-react';
import LocationSearch from './LocationSearch';
import TripPlanner from './TripPlanner';

export default function Dashboard() {
  const [location, setLocation] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/login');
    } catch {
      console.error('Failed to log out');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to TOUREASY</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Log Out
            </button>
          </div>
          <LocationSearch setLocation={setLocation} />
          {location && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Plan Your Trip</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-blue-500 mr-2" />
                  <select
                    value={tripDuration}
                    onChange={(e) => setTripDuration(e.target.value)}
                    className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Trip Duration</option>
                    <option value="half-day">Half Day (4-6 hours)</option>
                    <option value="full-day">Full Day (8-12 hours)</option>
                  </select>
                </div>
              </div>
              {tripDuration && <TripPlanner location={location} duration={tripDuration} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}