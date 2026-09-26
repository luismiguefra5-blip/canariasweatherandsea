# Canarias Weather & Sea V14

V14 adds the geographic and user-experience layer.

## Added
- Leaflet interactive map.
- Geographical spot markers.
- Island/activity/search filtering.
- Spot detail panel without leaving the map.
- 24-hour forecast table.
- Activity score summary.
- Analytics event for spot views.
- PostGIS geography column and spatial index.
- Nearby-spots RPC for radius searches.
- SEO route plan for islands, activities and individual spots.

Supabase documents PostGIS as the recommended extension for scalable geographic queries and spatial indexes. V14 uses it for spot coordinates and nearby searches.

The map uses OpenStreetMap tiles with attribution. Replace or configure your tile provider according to the traffic/usage requirements of the final deployment.

The product continues to distinguish forecast/model data from measured observations. Puertos del Estado states that its open-water wave predictions should not be treated as a direct beach-wave measurement.

## Apply
Run migration 005 after migrations 001–004.
Deploy the V14 frontend and configure your public Supabase project values.
