-- =====================================================================
-- Authentication (replaces Supabase Auth)
--
-- Accounts live in the private "auth" schema, which PostgREST does not
-- expose. The frontend only reaches them through public.sign_up and
-- public.sign_in, which return a JWT that PostgREST verifies with the
-- same secret (PGRST_JWT_SECRET / app.jwt_secret).
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA auth;

CREATE TABLE auth.accounts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    password_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------
-- HS256 JWT signing with pgcrypto
-- ---------------------------------------------------------------------

CREATE FUNCTION auth.base64url_encode(data bytea) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT translate(encode(data, 'base64'), E'+/=\n', '-_');
$$;

CREATE FUNCTION auth.sign_jwt(payload json) RETURNS text
    LANGUAGE sql STABLE
    AS $$
WITH
  header AS (
    SELECT auth.base64url_encode(convert_to('{"alg":"HS256","typ":"JWT"}', 'utf8')) AS data
  ),
  body AS (
    SELECT auth.base64url_encode(convert_to(payload::text, 'utf8')) AS data
  ),
  signables AS (
    SELECT header.data || '.' || body.data AS data FROM header, body
  )
SELECT signables.data || '.' ||
       auth.base64url_encode(hmac(signables.data, current_setting('app.jwt_secret'), 'sha256'))
FROM signables;
$$;

-- Returns the account id (JWT "sub") of the current request, or null
CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
SELECT nullif(current_setting('request.jwt.claims', true)::json ->> 'sub', '')::uuid;
$$;

-- Session payload returned to the frontend, same shape for sign_in/sign_up
CREATE FUNCTION auth.build_session(account auth.accounts) RETURNS json
    LANGUAGE plpgsql STABLE
    AS $$
declare
  expires_at bigint := extract(epoch from now() + interval '7 days')::bigint;
begin
  return json_build_object(
    'access_token', auth.sign_jwt(json_build_object(
      'role', 'authenticated',
      'sub', account.id,
      'email', account.email,
      'exp', expires_at
    )),
    'token_type', 'bearer',
    'expires_at', expires_at,
    'user', json_build_object('id', account.id, 'email', account.email)
  );
end;
$$;

-- ---------------------------------------------------------------------
-- Public RPCs
-- ---------------------------------------------------------------------

CREATE FUNCTION public.sign_up(email text, password text) RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, pg_temp
    AS $$
declare
  account auth.accounts;
begin
  if email is null or position('@' in email) = 0 then
    raise exception 'Email invalido' using errcode = '22023';
  end if;
  if password is null or length(password) < 6 then
    raise exception 'La contraseña debe tener al menos 6 caracteres' using errcode = '22023';
  end if;

  insert into auth.accounts(email, password_hash)
  values (lower(trim(email)), crypt(password, gen_salt('bf')))
  returning * into account;

  return json_build_object('user', json_build_object('id', account.id, 'email', account.email));
exception
  when unique_violation then
    raise exception 'El usuario ya existe' using errcode = '23505';
end;
$$;

CREATE FUNCTION public.sign_in(email text, password text) RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, pg_temp
    AS $$
declare
  account auth.accounts;
begin
  select * into account
  from auth.accounts a
  where a.email = lower(trim(sign_in.email));

  if account.id is null or account.password_hash <> crypt(password, account.password_hash) then
    raise exception 'Credenciales invalidas' using errcode = '28P01';
  end if;

  return auth.build_session(account);
end;
$$;
