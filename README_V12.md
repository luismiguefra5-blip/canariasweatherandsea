# Canarias Weather & Sea — V12

V12 adds the public-data and source layer.

### Added
- Public Supabase frontend.
- Individual spot template using SEO slugs.
- Published/featured filtering.
- Weather and marine cache display with freshness timestamps.
- Warnings table and public warning banner.
- Tides table and spot display.
- Official-source connector scaffolds for AEMET and Puertos del Estado.
- Source-status table.
- Monetization inventory with configurable placements.
- Clear distinction between forecasts/models and observations.
- Server-side secret placeholders for provider credentials.

### Deployment
1. Apply migrations 001, 002 and 003.
2. Configure your own Supabase URL and public client key in the public frontend.
3. Deploy Edge Functions and put AEMET/provider secrets in Supabase secrets.
4. Populate official warnings/tides through their server-side connectors.
5. Configure Cron/pg_net for scheduled refreshes.
6. Deploy the frontend under your own domain.

Do not put service-role/secret keys in browser files.
