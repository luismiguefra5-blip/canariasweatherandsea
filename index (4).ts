import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
Deno.serve(async () => {
  const checks:any = {};
  const tables = ["spots","weather_cache","marine_cache"];
  for (const t of tables) {
    const r = await supabase.from(t).select("*",{count:"exact",head:true});
    checks[t] = {ok:!r.error,count:r.count,error:r.error?.message||null};
  }
  const {data:latest} = await supabase.from("weather_cache").select("fetched_at").order("fetched_at",{ascending:false}).limit(1).maybeSingle();
  return new Response(JSON.stringify({ok:true,checks,latestWeather:latest?.fetched_at||null,checkedAt:new Date().toISOString()}),{headers:{"content-type":"application/json"}});
});
