"use client";

import { getWeather } from "@/app/utils/getWeather";
import { useEffect, useState } from "react";


const WeatherInfo = ({ city }: { city: string }) => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if (!city) return;

    getWeather(city)
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  }, [city]);

  if (!weather) return null;

  return (
    <div className="mt-4 bg-blue-100 p-3 rounded-lg">
      <h4>🌤️ Weather in {weather.name}</h4>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherInfo;
