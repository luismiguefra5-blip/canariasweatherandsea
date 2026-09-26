# Canarias Weather & Sea — PRODUCTO FINAL

## Arquitectura
Browser → CDN/Hosting → Supabase (public RLS)
                         ↘ Edge Functions → AEMET / Puertos del Estado / Open-Meteo
                         ↘ Storage → imágenes
                         ↘ Cron → actualización programada

## Propiedad
Para que el producto sea realmente tuyo:
1. Crear el proyecto Supabase con TU cuenta.
2. Registrar el dominio con TU cuenta.
3. Contratar hosting/CDN con TU cuenta.
4. Crear las cuentas de publicidad/analítica con TU empresa.
5. No compartir nunca las claves de servicio con el frontend.
6. Mantener una copia del repositorio/código bajo tu control.

## Base de datos
Aplicar, en orden:
001_initial.sql
002_admin_seo_storage.sql
003_sources_warnings_tides.sql
004_forecast_scores.sql
005_postgis_analytics.sql
006_final_product.sql

## Frontend
Usar `index_final.html` como base de la portada.
Crear rutas server-side/rewrites:
/
/islas/<isla>
/actividad/<actividad>
/spot/<slug>

## Fuentes
Open-Meteo: meteorología/marino de modelo.
AEMET: predicción y avisos oficiales según los endpoints y municipios configurados.
Puertos del Estado: observaciones/predicciones oceanográficas según disponibilidad y condiciones de uso.

## Monetización
Preparado para:
- publicidad display;
- patrocinio de secciones;
- afiliación de escuelas/escuelas de surf;
- alquiler de material;
- excursiones;
- actividades náuticas;
- hoteles y negocios locales;
- newsletter patrocinada;
- futura cuenta premium.

## Importante
Los índices de actividad no son índices de seguridad. Deben mostrarse como orientación basada en variables de previsión. Los avisos oficiales deben prevalecer en la comunicación al usuario.
