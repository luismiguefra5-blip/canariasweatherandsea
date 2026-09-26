
async function getMarine(lat, lon) {
  const url = new URL("https://marine-api.open-meteo.com/v1/marine");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("current", "wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_period,sea_surface_temperature,ocean_current_velocity,ocean_current_direction");
  url.searchParams.set("forecast_days", "2");
  url.searchParams.set("timezone", "Atlantic/Canary");
  url.searchParams.set("cell_selection", "sea");
  const r=await fetch(url);
  if(!r.ok) throw new Error(`marine_http_${r.status}`);
  return r.json();
}
module.exports={getMarine};
