# Canarias Weather & Sea V13

V13 is the productization layer.

## Main additions
- Normalized hourly forecast table.
- Activity scoring engine for surf, kitesurf, windsurf, diving, swimming and fishing.
- Public activity indexes on the home page.
- Official-source refresh Edge Function scaffold.
- Source/status tracking.
- Improved individual spot routing.
- Forecast/model vs observation distinction.
- Server-side provider secret handling.

## Important source behaviour
AEMET OpenData requires an API key for developer access. Current AEMET communications state that newly requested keys have a 3-month validity period and that keys without expiry will stop being valid from 15 October 2026. Plan key renewal/rotation accordingly.

Puertos del Estado distinguishes real-time observations from model predictions. Its wave forecasts are updated about twice daily and provide hourly forecast fields up to 72h. Open-water wave predictions should not be treated as a direct beach-wave measurement because local bathymetry and coastline geometry matter.

## Setup
Apply migration 004 after migrations 001-003.
Deploy refresh-official.
Set AEMET_API_KEY and any permitted Puertos credentials/URLs as server-side secrets.
Populate hourly_forecast/activity_scores through the refresh pipeline.
Deploy index_v13.html as the public home page and keep the spot route template available at /spot/<slug>.
