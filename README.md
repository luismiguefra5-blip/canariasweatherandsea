# Canarias Weather & Sea — V10

V10 añade una base de producción basada en Supabase/PostgreSQL:
- migración SQL
- Row Level Security para lectura pública controlada
- Edge Function `refresh-weather`
- Edge Function `refresh-marine`
- cron horario para refrescar datos
- separación de secretos del frontend

## Fuentes
Meteorología: Open-Meteo en esta implementación.
Mar: Open-Meteo Marine en esta implementación.

La integración de AEMET y Puertos del Estado debe hacerse con conectores separados y respetando autenticación, límites, atribución y condiciones de uso. Puertos del Estado dispone de observaciones en tiempo real y predicciones oceanográficas; sus predicciones de oleaje se actualizan aproximadamente dos veces al día y llegan a 72 h. Además, advierte que el oleaje de mar abierto no equivale directamente al de una playa. 

## Seguridad
Nunca colocar claves de AEMET, credenciales de servicio de Supabase ni secretos de terceros en `index.html`.
Usar Supabase Vault/Secrets o variables de entorno.

## Despliegue real
1. Crear proyecto Supabase bajo la cuenta del propietario.
2. Aplicar `supabase/migrations/001_initial.sql`.
3. Importar `spots.json` a `public.spots`.
4. Configurar secretos.
5. Desplegar Edge Functions.
6. Programar Cron.
7. Conectar el frontend a las tablas/API.
8. Añadir autenticación de administrador.
9. Publicar dominio.

## Importante
`supabase/cron.sql` contiene `YOUR_PROJECT` deliberadamente: no hay credenciales ni URLs privadas en el proyecto.
