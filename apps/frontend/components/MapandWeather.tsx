"use client";

import React, { useState } from "react";

import WeatherInfo from "./WeatherInfo";
import MapWithDirections from "./map";

const MapAndWeather = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="p-4">
      <MapWithDirections
        origin={origin} 
        destination={destination} 
        setOrigin={setOrigin} 
        setDestination={setDestination} 
      />

      {/* Show weather info for origin and destination */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {origin && <WeatherInfo city={origin} />}
        {destination && <WeatherInfo city={destination} />}
      </div>
    </div>
  );
};

export default MapAndWeather;
