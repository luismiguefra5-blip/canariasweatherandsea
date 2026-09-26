# Fuentes V12

## AEMET
AEMET OpenData dispone actualmente de endpoints de predicción municipal diaria y horaria.
La API key debe mantenerse como secreto del backend/Edge Function.

## Puertos del Estado
Portuscopia/Portus ofrece datos históricos, observaciones de redes de medida y predicciones de oleaje,
nivel del mar, corrientes, salinidad y temperatura. Las predicciones no deben presentarse como
observaciones locales de una playa.

## Supabase
La actualización horaria se ejecuta con Cron/pg_cron y puede invocar Edge Functions mediante pg_net.
Las claves secretas deben permanecer en el servidor/Edge Functions.
