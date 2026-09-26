import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(url, serviceKey);

const weatherUrl = "https://api.open-meteo.com/v1/forecast";
const marineUrl = "https://marine-api.open-meteo.com/v1/marine";

Deno.serve(async () => {
  const { data: spots, error } = await supabase.from("spots").select("id,latitude,longitude").eq("published", true);
  if (error) return new Response(JSON.stringify({error: error.message}), {status: 500});

  let weatherCount = 0, marineCount = 0;
  for (const s of spots ?? []) {
    const common = `latitude=${s.latitude}&longitude=${s.longitude}&timezone=auto`;
    const w = await fetch(`${weatherUrl}?${common}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,weather_code&hourly=temperature_2m,precipitation_probability,wind_speed_10m,wind_direction_10m,uv_index`);
    if (w.ok) {
      const data = await w.json();
      await supabase.from("weather_cache").upsert({spot_id:s.id,payload:data,fetched_at:new Date().toISOString()},{onConflict:"spot_id"});
      weatherCount++;
    }
    const m = await fetch(`${marineUrl}?${common}&current=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,sea_surface_temperature&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,sea_surface_temperature`);
    if (m.ok) {
      const data = await m.json();
      await supabase.from("marine_cache").upsert({spot_id:s.id,payload:data,fetched_at:new Date().toISOString()},{onConflict:"spot_id"});
      marineCount++;
    }
  }
  return new Response(JSON.stringify({ok:true,weatherCount,marineCount,checkedAt:new Date().toISOString()}),{headers:{"content-type":"application/json"}});
});
