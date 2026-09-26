// V12 AEMET connector scaffold.
// Store AEMET_API_KEY only as a Supabase Edge Function secret.
// AEMET currently provides municipal daily/hourly endpoints; adapt the endpoint
// and municipality codes used by your deployment.
export async function fetchAemet(url:string, apiKey:string){
 const r=await fetch(url,{headers:{api_key:apiKey}});
 if(!r.ok) throw new Error(`AEMET ${r.status}`);
 return await r.json();
}
