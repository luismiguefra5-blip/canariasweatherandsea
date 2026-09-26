const express=require("express");
const cors=require("cors");
const fs=require("fs");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;
const spots=JSON.parse(fs.readFileSync(path.join(__dirname,"..","spots.json"),"utf8"));
const {getWeather}=require("./connectors/open_meteo");
const {getMarine}=require("./connectors/open_meteo_marine");
const cache=new Map();
const CACHE_MS=Number(process.env.CACHE_MINUTES||60)*60*1000;
app.use(cors());
app.use(express.json());

app.get("/api/health",(req,res)=>res.json({ok:true,service:"canarias-weather-sea-api",version:"v8"}));
app.get("/api/spots",(req,res)=>{
  const q=(req.query.q||"").toLowerCase();
  const activity=(req.query.activity||"").toLowerCase();
  const result=spots.filter(s=>
    s.active &&
    (!q || `${s.name} ${s.island}`.toLowerCase().includes(q)) &&
    (!activity || s.activities.includes(activity))
  );
  res.json({updatedAt:new Date().toISOString(),count:result.length,spots:result});
});
app.get("/api/spots/:id",(req,res)=>{
  const spot=spots.find(s=>s.id===req.params.id);
  if(!spot) return res.status(404).json({error:"spot_not_found"});
  res.json({updatedAt:new Date().toISOString(),spot});
});
app.get("/api/data/:id",async(req,res)=>{
 const spot=spots.find(s=>s.id===req.params.id);
 if(!spot) return res.status(404).json({error:"spot_not_found"});
 const cached=cache.get(spot.id);
 if(cached && Date.now()-cached.fetchedAt<CACHE_MS) return res.json({...cached,cache:true});
 try{
   const [weather,marine]=await Promise.all([getWeather(spot.lat,spot.lon),getMarine(spot.lat,spot.lon)]);
   const result={spotId:spot.id,fetchedAt:new Date().toISOString(),weather,marine};
   cache.set(spot.id,{...result,fetchedAt:Date.now()});
   res.json(result);
 }catch(e){
   res.status(502).json({error:"provider_unavailable",message:e.message});
 }
});
app.get("/api/cache-status",(req,res)=>{
 const items=[...cache.entries()].map(([spotId,v])=>({spotId,fetchedAt:v.fetchedAt}));
 res.json({cacheMinutes:Number(process.env.CACHE_MINUTES||60),items});
});
app.get("/api/config",(req,res)=>res.json({
  version:"v8",
  sources:{
    weather:"Open-Meteo / AEMET (production connector pending)",
    marine:"Open-Meteo Marine / Puertos del Estado (production connector pending)"
  },
  updateIntervalMinutes:60
}));
app.listen(PORT,()=>console.log(`Canarias Weather & Sea API listening on ${PORT}`));
