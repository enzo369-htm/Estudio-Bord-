alter table editorial_items add column if not exists title_en text not null default '';
alter table editorial_items add column if not exists excerpt_en text not null default '';
alter table editorial_items add column if not exists body_en text not null default '';

alter table pages add column if not exists title_en text not null default '';
alter table pages add column if not exists body_en text not null default '';
