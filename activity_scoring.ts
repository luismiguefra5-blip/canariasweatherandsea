// V13 transparent activity scoring.
// This is a heuristic for discovery, NOT a safety assessment.
// Inputs are model/forecast values; beach-specific conditions can differ.

export type Conditions = {
  wind_kmh?: number|null; wave_height_m?: number|null; wave_period_s?: number|null;
  swell_height_m?: number|null; swell_period_s?: number|null; water_temp_c?: number|null;
};

const clamp=(n:number)=>Math.max(0,Math.min(100,n));
function band(v:number|null|undefined,min:number,max:number){
  if(v==null) return 50;
  if(v<min) return clamp(100-Math.abs(v-min)*18);
  if(v>max) return clamp(100-(v-max)*18);
  return 100;
}
export function scoreActivity(a:string,c:Conditions){
  const w=c.wind_kmh??0, h=c.wave_height_m??0, p=c.wave_period_s??0;
  let score=50, reasons:string[]=[];
  if(a==="surf"){
    score=(band(h,.6,2.4)*.45+band(p,9,16)*.30+band(w,5,28)*.25);
    reasons=["Altura de ola y periodo ponderados","Viento considerado como factor secundario"];
  } else if(a==="kitesurf"||a==="windsurf"){
    score=(band(w,15,35)*.65+band(h,.2,2.5)*.20+band(p,5,14)*.15);
    reasons=["Viento ponderado como factor principal","Oleaje y periodo como factores secundarios"];
  } else if(a==="swimming"){
    score=(band(w,0,20)*.35+band(h,0,.8)*.45+band(p,4,12)*.20);
    reasons=["Oleaje y viento calmado favorecen la actividad"];
  } else if(a==="diving"){
    score=(band(w,0,18)*.35+band(h,0,1)*.45+band(p,5,14)*.20);
    reasons=["Oleaje y viento considerados para estabilidad superficial"];
  } else if(a==="fishing"){
    score=(band(w,4,25)*.35+band(h,.2,1.8)*.40+band(p,6,15)*.25);
    reasons=["Viento, oleaje y periodo ponderados"];
  }
  return {score:Math.round(clamp(score)),label:score>=75?"Favorable":score>=50?"Aceptable":"Desfavorable",reasons};
}
