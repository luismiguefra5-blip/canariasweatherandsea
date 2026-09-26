# Canarias Weather & Sea — V11

V11 adds the administration and production-control layer to the V10 Supabase architecture.

## Included
- Supabase Auth admin login.
- CRUD for sea/weather spots.
- Island, coordinates and activity assignment.
- SEO slug, title and description fields.
- Publish/unpublish and featured flags.
- Public image bucket for spot hero images.
- Admin audit log.
- RLS policies for public reads and admin writes.
- `refresh-all` Edge Function for hourly weather + marine refresh.
- `source-health` Edge Function for operational checks.
- Updated hourly cron examples.
- No service-role key in the frontend.

## Important
This package is prepared to run in YOUR accounts. It is not deployed to a domain or Supabase project by itself.

### Supabase setup
1. Create your own Supabase project.
2. Run `supabase/migrations/001_initial.sql`.
3. Run `supabase/migrations/002_admin_seo_storage.sql`.
4. Create an Auth user in your project.
5. Insert that user's UUID into `public.profiles` with role `admin`.
6. Deploy `supabase/functions/refresh-all`.
7. Deploy `supabase/functions/source-health`.
8. Set the Supabase service-role secret only as an Edge Function/server secret.
9. Configure the cron jobs from `supabase/cron.sql` using your project's secure secret mechanism.
10. Copy `admin/config.example.js` to `admin/config.js` and set only the public Supabase URL + public client key.

## Security
Never put `SUPABASE_SERVICE_ROLE_KEY` in `admin/` or in browser code. The frontend should use only the public client key and Supabase RLS. Server-side Edge Functions use the service role only when necessary.

## Data model
Public data is separated from administrative controls. Forecast data remains cached in Postgres with timestamps so the UI can show data freshness. Forecast/model output should be presented as forecast/model data, not as an on-site observation.

## Next production phase
- Connect the public frontend to Supabase.
- Add AEMET official warnings and Puertos del Estado observations/predictions with explicit source attribution.
- Add tides and beach-specific interpretation.
- Add analytics events and ad/affiliate inventory.
- Deploy to the user's own domain/hosting.
