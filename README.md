# Backend V8

API REST mínima para Canarias Weather & Sea.

## Endpoints
GET /api/health
GET /api/config
GET /api/spots
GET /api/spots?q=el%20medano
GET /api/spots?activity=surf
GET /api/spots/tenerife-el-medano

## Variables
PORT=3000

Las claves de proveedores meteorológicos no se incluyen en este repositorio. En producción deben existir como variables de entorno/secret manager y ser utilizadas por conectores de servidor.
