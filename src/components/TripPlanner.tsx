import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Utensils, Car, User, Hotel } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  rating: number;
  address: string;
}

interface TripPlannerProps {
  location: string;
  duration: string;
}

export default function TripPlanner({ location, duration }: TripPlannerProps) {
  const [attractions, setAttractions] = useState<Location[]>([]);
  const [restaurants, setRestaurants] = useState<Location[]>([]);
  const [rentals, setRentals] = useState<Location[]>([]);
  const [guides, setGuides] = useState<Location[]>([]);
  const [hotels, setHotels] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<Location[]>([]);

  useEffect(() => {
    // Simulated API calls - replace with actual API calls in a production environment
    const fetchLocations = async () => {
      try {
        // Replace these with actual API calls
        const attractionsResponse = await axios.get(`https://api.example.com/attractions?location=${location}`);
        setAttractions(attractionsResponse.data.slice(0, 10));

        const restaurantsResponse = await axios.get(`https://api.example.com/restaurants?location=${location}`);
        setRestaurants(restaurantsResponse.data.slice(0, 10));

        const rentalsResponse = await axios.get(`https://api.example.com/rentals?location=${location}`);
        setRentals(rentalsResponse.data.slice(0, 10));

        const guidesResponse = await axios.get(`https://api.example.com/guides?location=${location}`);
        setGuides(guidesResponse.data.slice(0, 10));

        const hotelsResponse = await axios.get(`https://api.example.com/hotels?location=${location}`);
        setHotels(hotelsResponse.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [location]);

  const handleLocationSelect = (id: string) => {
    setSelectedLocations(prev => 
      prev.includes(id) ? prev.filter(locId => locId !== id) : [...prev, id]
    );
  };

  const generateItinerary = () => {
    const allLocations = [...attractions, ...restaurants, ...rentals, ...guides, ...hotels];
    const selected = allLocations.filter(loc => selectedLocations.includes(loc.id));
    // Simple sorting based on rating - replace with more sophisticated algorithm in production
    const sorted = selected.sort((a, b) => b.rating - a.rating);
    setItinerary(sorted);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <LocationList title="Attractions" icon={<MapPin className="h-6 w-6 text-blue-500" />} locations={attractions} selectedLocations={selectedLocations} onSelect={handleLocationSelect} />
        <LocationList title="Restaurants" icon={<Utensils className="h-6 w-6 text-green-500" />} locations={restaurants} selectedLocations={selectedLocations} onSelect={handleLocationSelect} />
        <LocationList title="Vehicle Rentals" icon={<Car className="h-6 w-6 text-red-500" />} locations={rentals} selectedLocations={selectedLocations} onSelect={handleLocationSelect} />
        <LocationList title="Local Guides" icon={<User className="h-6 w-6 text-yellow-500" />} locations={guides} selectedLocations={selectedLocations} onSelect={handleLocationSelect} />
        <LocationList title="Hotels" icon={<Hotel className="h-6 w-6 text-purple-500" />} locations={hotels} selectedLocations={selectedLocations} onSelect={handleLocationSelect} />
      </div>
      <button
        onClick={generateItinerary}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Itinerary
      </button>
      {itinerary.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Itinerary</h3>
          <ul className="space-y-2">
            {itinerary.map((loc, index) => (
              <li key={loc.id} className="bg-gray-100 p-4 rounded-lg">
                <span className="font-bold">{index + 1}. {loc.name}</span>
                <p className="text-sm text-gray-600">{loc.address}</p>
                <p className="text-sm text-gray-600">Rating: {loc.rating}/5</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface LocationListProps {
  title: string;
  icon: React.ReactNode;
  locations: Location[];
  selectedLocations: string[];
  onSelect: (id: string) => void;
}

function LocationList({ title, icon, locations, selectedLocations, onSelect }: LocationListProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <ul className="space-y-2">
        {locations.map(loc => (
          <li key={loc.id} className="flex items-center">
            <input
              type="checkbox"
              id={loc.id}
              checked={selectedLocations.includes(loc.id)}
              onChange={() => onSelect(loc.id)}
              className="mr-2"
            />
            <label htmlFor={loc.id} className="text-sm">
              {loc.name} ({loc.rating}/5)
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}