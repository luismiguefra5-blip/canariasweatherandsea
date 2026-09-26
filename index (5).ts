
import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async () => {
  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(url, serviceKey);

  const { data: spots, error } = await supabase
    .from("spots").select("id,latitude,longitude").eq("active", true);
  if (error) return Response.json({error:error.message},{status:500});

  let success=0, failed=0;
  for (const spot of spots ?? []) {
    try {
      const u = new URL("https://api.open-meteo.com/v1/forecast");
      u.searchParams.set("latitude", spot.latitude);
      u.searchParams.set("longitude", spot.longitude);
      u.searchParams.set("current","temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m");
      u.searchParams.set("hourly","temperature_2m,weather_code,wind_speed_10m");
      u.searchParams.set("forecast_days","2");
      u.searchParams.set("timezone","Atlantic/Canary");
      const r=await fetch(u);
      if(!r.ok) throw new Error(`HTTP ${r.status}`);
      const payload=await r.json();
      await supabase.from("weather_cache").upsert({
        spot_id:spot.id, provider:"open-meteo", observed_at:new Date().toISOString(),
        payload, fetched_at:new Date().toISOString()
      });
      success++;
    } catch (_) { failed++; }
  }
  return Response.json({ok:true,success,failed,updatedAt:new Date().toISOString()});
});
