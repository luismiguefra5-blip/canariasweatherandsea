// V12 Puertos del Estado connector scaffold.
// Keep provider-specific credentials/URLs server-side.
// Use Portus/Portuscopia data where permitted by the applicable service conditions.
// Model predictions and measured observations must be labelled separately.
export type MarineSourceRecord = {source:string, observedAt?:string, payload:unknown};
export function normalizeMarineRecord(payload:unknown): MarineSourceRecord {
  return {source:"puertos_estado", payload};
}
