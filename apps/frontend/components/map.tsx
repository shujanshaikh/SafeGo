"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Navigation } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 19.076, // Mumbai
  lng: 72.8777,
};

const MapWithDirections = ({
    origin,
    destination,
    setOrigin,
    setDestination
  }: {
    origin: string;
    destination: string;
    setOrigin: React.Dispatch<React.SetStateAction<string>>;
    setDestination: React.Dispatch<React.SetStateAction<string>>;
  }) =>{
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRoute, setShowRoute] = useState(false);

  
  const handleRoute = () => {
    if (!origin || !destination) {
      alert("Please enter both origin and destination.");
      return;
    }
    setShowRoute(true);
    setResponse(null); 
  };
  

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Origin (e.g., Mumbai)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Destination (e.g., Pune)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <button
          className="w-full sm:w-auto px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 active:bg-emerald-800 transition-colors flex items-center justify-center shadow-sm"
          onClick={handleRoute}
        >
          <Navigation className="h-5 w-5 mr-2" />
          <span className="whitespace-nowrap">Go</span>
        </button>
      </div>

      {/* Google Maps */}
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
          {/* Directions Service */}
          {origin && destination && showRoute && !response && (
  <DirectionsService
    options={{
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }}
    callback={(res, status) => {
      console.log("Status:", status);
      if (status === "OK" && res?.routes?.length) {
        setResponse(res);
      } else {
        alert("Route not found!");
      }
    }}
  />
)}
          {/* Directions Renderer */}
          {response && <DirectionsRenderer options={{ directions: response }} />}
        </GoogleMap>
      </LoadScript>

      {/* Route Info */}
      {response?.routes?.[0]?.legs?.[0] ? (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md border border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-emerald-800 flex items-center">
              🛣️ Route Information
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-600 mb-1">Distance</p>
              <p className="text-2xl font-bold text-emerald-900">{response.routes[0].legs[0].distance.text}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-600 mb-1">Duration</p>
              <p className="text-2xl font-bold text-emerald-900">{response.routes[0].legs[0].duration.text}</p>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default MapWithDirections;

