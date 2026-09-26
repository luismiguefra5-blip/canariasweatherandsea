-- Configure these jobs in YOUR Supabase project after deploying the Edge Functions.
-- Replace YOUR_PROJECT and use Vault/Secrets for credentials. Never hard-code service-role keys.
select cron.schedule(
  'canarias-refresh-all-hourly',
  '5 * * * *',
  $$select net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/refresh-all',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || '<EDGE_FUNCTION_SECRET>'),
    body := '{}'::jsonb
  );$$
);

select cron.schedule(
  'canarias-source-health-hourly',
  '15 * * * *',
  $$select net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/source-health',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || '<EDGE_FUNCTION_SECRET>'),
    body := '{}'::jsonb
  );$$
);
