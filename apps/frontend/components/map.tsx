"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 19.076, // Mumbai
  lng: 72.8777,
};

const MapWithDirections = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
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
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Origin (e.g., Mumbai)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Destination (e.g., Pune)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={handleRoute}
        >
          Get Route
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
        <div className="mt-4 p-3 bg-gray-200 rounded">
          <h4>🛣️ Route Info</h4>
          <p>
            Distance: {response.routes[0].legs[0].distance.text} | 
            Duration: {response.routes[0].legs[0].duration.text}
          </p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

export default MapWithDirections;
