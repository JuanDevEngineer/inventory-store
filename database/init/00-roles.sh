#!/bin/sh
# Creates the roles PostgREST needs and stores the JWT secret where the
# auth functions can read it. Runs once, when the data volume is empty.
set -e

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  --set authenticator_password="$AUTHENTICATOR_PASSWORD" \
  --set jwt_secret="$JWT_SECRET" <<-'EOSQL'
  -- Role used when a request has no token (only login / sign up)
  CREATE ROLE anon NOLOGIN;
  -- Role used when a request carries a valid JWT
  CREATE ROLE authenticated NOLOGIN;
  -- Role PostgREST connects with; it switches to anon/authenticated per request
  CREATE ROLE authenticator LOGIN NOINHERIT PASSWORD :'authenticator_password';
  GRANT anon TO authenticator;
  GRANT authenticated TO authenticator;

  SELECT format('ALTER DATABASE %I SET app.jwt_secret TO %L', current_database(), :'jwt_secret')
  \gexec
EOSQL
