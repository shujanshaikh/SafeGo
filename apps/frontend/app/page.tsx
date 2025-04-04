"use client"
import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Cloud, 
  Users,
  Menu,
  X
} from 'lucide-react';
import MapWithDirections from '@/components/map';
import WeatherInfo from '@/components/WeatherInfo';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleStartNavigation = () => {
    setIsNavigating(true);
  };

  const handleRouteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching route from', startLocation, 'to', endLocation);
  };

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Navigation */}
      <nav className="bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold">SafeGo</span>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-emerald-500"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500">Dashboard</a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500">Safety tips</a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500">Alerts</a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500"> Recent Reports</a>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-emerald-500">Dashboard</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-emerald-500">Safety tips</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-emerald-500">Alerts</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-emerald-500">Recent Reports</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {isNavigating ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold mb-4">Plan Your Route</h2>
            <form onSubmit={handleRouteSearch} className="space-y-4">
              <div>
                <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Location</label>
                <input
                  type="text"
                  id="start"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter start location"
                  required
                />
              </div>
              <div>
                <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Location</label>
                <input
                  type="text"
                  id="end"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter destination"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsNavigating(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-500"
                >
                  Find Route
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Map Preview */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="aspect-w-16 aspect-h-9 mb-4">
               <MapWithDirections 
                 origin={startLocation}
                 destination={endLocation}
                 setOrigin={setStartLocation}
                 setDestination={setEndLocation}
               />
              </div>
              <div className="flex justify-center">
                
              </div>
            </div>

            {/* Current Red Spots */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Current Red Spot Areas
              </h3>
              <div className="space-y-4">
                {[
                  { location: 'Old Industrial Area', issue: 'High crime rate' },
                  { location: 'Eastern Underpass', issue: 'Poor lighting and theft' },
                  { location: 'South Market', issue: 'Frequent disturbances' }
                ].map((spot) => (
                  <div
                    key={spot.location}
                    className="p-4 rounded-lg bg-red-50 border border-red-200 hover:border-red-400 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-red-800">{spot.location}</h4>
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-sm text-red-700">{spot.issue}</p>
                  </div>
                ))}
                {startLocation && <WeatherInfo city={startLocation} />}
                {endLocation && <WeatherInfo city={endLocation} />}
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Cloud className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Weather Status</p>
                <p className="text-2xl font-semibold text-gray-900">Clear</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Crowd Reports</p>
                <p className="text-2xl font-semibold text-gray-900">28</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;