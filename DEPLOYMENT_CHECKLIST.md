# Production deployment checklist

1. GitHub repository contains this package with index.html set to the final public UI.
2. Supabase migrations 001-006 use text spot IDs consistently.
3. Run migrations in order in Supabase SQL Editor or via Supabase CLI.
4. Configure Supabase URL and publishable/anon key in the frontend where required.
5. Configure AEMET/Puertos secrets only in Supabase Edge Functions.
6. Deploy Edge Functions and configure scheduled refresh.
7. Configure Vercel environment variables.
8. Test public site, admin, data refresh, warnings and tides.
9. Connect the custom domain.
