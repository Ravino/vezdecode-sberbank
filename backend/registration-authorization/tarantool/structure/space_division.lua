\set language sql
create table divisions (division_id UNSIGNED UNIQUE PRIMARY KEY NOT NULL AUTOINCREMENT, name TEXT NOT NULL, description TEXT NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, uuid TEXT NOT NULL)
