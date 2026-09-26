import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const sb=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const AEMET_KEY=Deno.env.get("AEMET_API_KEY")||"";

async function fetchAemet(url:string){
  const r=await fetch(url,{headers:{api_key:AEMET_KEY}});
  if(!r.ok) throw new Error(`AEMET ${r.status}`);
  return await r.json();
}

Deno.serve(async()=>{
  // V13 deliberately keeps provider-specific URLs/configuration server-side.
  // Populate official warning records after mapping the desired Canary municipalities.
  // AEMET currently exposes daily/hourly municipal prediction endpoints.
  const result={aemetConfigured:!!AEMET_KEY,puertosConfigured:!!Deno.env.get("PUERTOS_ESTADO_URL")};
  await sb.from("source_status").upsert({
    source_key:"aemet",source_name:"AEMET OpenData",source_type:"official",
    last_attempt_at:new Date().toISOString(),
    status:AEMET_KEY?"configured":"not_configured",
    message:AEMET_KEY?"Connector ready":"Add AEMET_API_KEY as an Edge Function secret"
  });
  return new Response(JSON.stringify({ok:true,result}),{headers:{"content-type":"application/json"}});
});
