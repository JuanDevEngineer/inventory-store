-- =====================================================================
-- Demo data
--
-- Creates the login admin@inventory.com / admin123 as superadmin. Inserting
-- that user fires the triggers in 01-schema.sql, which create its company
-- ("Generica"), the default brand and category, and all its permissions.
-- Sample categories, brands, products and kardex movements are added on top.
--
-- Safe to run more than once: it does nothing if the admin already exists.
-- =====================================================================

DO $$
declare
  v_account_id uuid;
  v_user_id bigint;
  v_company_id bigint;
  v_cat_drinks bigint;
  v_cat_snacks bigint;
  v_cat_cleaning bigint;
  v_brand_generic bigint;
  v_brand_coca bigint;
  v_brand_lays bigint;
  v_brand_clorox bigint;
begin
  if exists (select 1 from auth.accounts where email = 'admin@inventory.com') then
    raise notice 'Seed skipped: admin@inventory.com already exists';
    return;
  end if;

  -- login account + app user (triggers create company, defaults, permissions)
  insert into auth.accounts(email, password_hash)
  values ('admin@inventory.com', crypt('admin123', gen_salt('bf')))
  returning id into v_account_id;

  insert into users(name, registered_at, user_type, auth_id, email)
  values ('Administrador', current_date, 'superadmin', v_account_id::text, 'admin@inventory.com')
  returning id into v_user_id;

  select id into v_company_id from companies where admin_user_id = v_user_id;
  select id into v_brand_generic from brands where company_id = v_company_id and description = 'Generica';

  -- categories
  insert into categories(description, color, company_id) values ('Bebidas', '#2196F3', v_company_id) returning id into v_cat_drinks;
  insert into categories(description, color, company_id) values ('Snacks', '#FF9800', v_company_id) returning id into v_cat_snacks;
  insert into categories(description, color, company_id) values ('Limpieza', '#4CAF50', v_company_id) returning id into v_cat_cleaning;

  -- brands
  insert into brands(description, company_id) values ('Coca Cola', v_company_id) returning id into v_brand_coca;
  insert into brands(description, company_id) values ('Lays', v_company_id) returning id into v_brand_lays;
  insert into brands(description, company_id) values ('Clorox', v_company_id) returning id into v_brand_clorox;

  -- products (start at 0 stock; the kardex entries below set the stock)
  insert into products(description, brand_id, stock, min_stock, barcode, internal_code, sale_price, purchase_price, category_id, company_id) values
    ('Coca Cola 500ml',      v_brand_coca,    0, 24, '7750182000017', 'BEB-001', 3.50, 2.10, v_cat_drinks,   v_company_id),
    ('Coca Cola 1.5L',       v_brand_coca,    0, 12, '7750182000024', 'BEB-002', 7.00, 4.80, v_cat_drinks,   v_company_id),
    ('Agua mineral 625ml',   v_brand_generic, 0, 30, '7750182000031', 'BEB-003', 2.00, 1.10, v_cat_drinks,   v_company_id),
    ('Papas Lays clasicas',  v_brand_lays,    0, 20, '7750182000048', 'SNK-001', 2.50, 1.60, v_cat_snacks,   v_company_id),
    ('Papas Lays picantes',  v_brand_lays,    0, 20, '7750182000055', 'SNK-002', 2.50, 1.60, v_cat_snacks,   v_company_id),
    ('Lejia Clorox 1L',      v_brand_clorox,  0, 10, '7750182000062', 'LIM-001', 6.50, 4.20, v_cat_cleaning, v_company_id);

  -- kardex: entries add stock and exits subtract it (update_stock trigger)
  insert into kardex(date, type, user_id, product_id, quantity, company_id, detail)
  select current_date - 7, 'entrada', v_user_id, p.id, q.qty, v_company_id, 'Compra inicial'
  from products p
  join (values ('BEB-001', 48), ('BEB-002', 24), ('BEB-003', 20), ('SNK-001', 40), ('SNK-002', 15), ('LIM-001', 12)) as q(code, qty)
    on q.code = p.internal_code
  where p.company_id = v_company_id;

  insert into kardex(date, type, user_id, product_id, quantity, company_id, detail)
  select current_date - 2, 'salida', v_user_id, p.id, q.qty, v_company_id, 'Venta'
  from products p
  join (values ('BEB-001', 30), ('SNK-001', 25), ('LIM-001', 5)) as q(code, qty)
    on q.code = p.internal_code
  where p.company_id = v_company_id;

  raise notice 'Seed loaded: admin@inventory.com / admin123 (company id %)', v_company_id;
end
$$;
