export const getWeather = async (city: string) => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
  
    if (!response.ok) throw new Error("Weather data not found");
  
    return await response.json();
  };
  