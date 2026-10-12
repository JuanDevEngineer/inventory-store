-- =====================================================================
-- Privileges
--
-- anon:          can only sign up and sign in
-- authenticated: full access to the inventory tables and functions
--                (same level of access the Supabase project had, since
--                row level security was never enabled there)
-- =====================================================================

REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA auth FROM PUBLIC;

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT EXECUTE ON FUNCTION public.sign_up(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sign_in(text, text) TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Lets functions and future RLS policies read the current account id
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;
