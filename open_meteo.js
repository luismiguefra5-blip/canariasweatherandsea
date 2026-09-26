
async function getWeather(lat, lon) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("current", "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m");
  url.searchParams.set("hourly", "temperature_2m,weather_code,wind_speed_10m");
  url.searchParams.set("forecast_days", "2");
  url.searchParams.set("timezone", "Atlantic/Canary");
  const r=await fetch(url);
  if(!r.ok) throw new Error(`weather_http_${r.status}`);
  return r.json();
}
module.exports={getWeather};
