create extension if not exists "uuid-ossp";

drop table if exists public.products CASCADE;
drop table if exists public.stocks CASCADE;

CREATE TABLE if not exists public.products (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title text NOT NULL,
    description text ,
    price integer NOT NULL
);

CREATE TABLE if not exists public.stocks (
    id uuid default uuid_generate_v4 () PRIMARY key,
    product_id uuid NOT null,
    count integer NOT null,
    CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


INSERT into products(id, title, description, price) VALUES (
    uuid_generate_v4 (),
    'car1',
    'car1 description',
    111
), (
    uuid_generate_v4 (),
    'car2',
    'car2 description',
    222
),
(
    uuid_generate_v4 (),
    'car3',
    'car3 description',
    333
),
(
    uuid_generate_v4 (),
    'car4',
    'car4 description',
    444
),
(
    uuid_generate_v4 (),
    'car5',
    'car5 description',
    555
),
(
    uuid_generate_v4 (),
    'car6',
    'car6 description',
    666
),
(
    uuid_generate_v4 (),
    'car7',
    'car7 description',
    777
);

insert into stocks (product_id, count) select id, trunc(10 + random() * 25) from products;


SELECT products.id, title, description, price, stocks.count FROM products JOIN stocks ON products.id = stocks.product_id
