
import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const {data:spots,error}=await supabase.from("spots").select("id,latitude,longitude").eq("active",true);
  if(error) return Response.json({error:error.message},{status:500});
  let success=0,failed=0;
  for(const spot of spots??[]){
    try{
      const u=new URL("https://marine-api.open-meteo.com/v1/marine");
      u.searchParams.set("latitude",spot.latitude);u.searchParams.set("longitude",spot.longitude);
      u.searchParams.set("current","wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_period,sea_surface_temperature,ocean_current_velocity,ocean_current_direction");
      u.searchParams.set("forecast_days","2");u.searchParams.set("timezone","Atlantic/Canary");u.searchParams.set("cell_selection","sea");
      const r=await fetch(u);if(!r.ok)throw new Error(`HTTP ${r.status}`);
      const payload=await r.json();
      await supabase.from("marine_cache").upsert({spot_id:spot.id,provider:"open-meteo-marine",observed_at:new Date().toISOString(),payload,fetched_at:new Date().toISOString()});
      success++;
    }catch(_){failed++;}
  }
  return Response.json({ok:true,success,failed,updatedAt:new Date().toISOString()});
});
