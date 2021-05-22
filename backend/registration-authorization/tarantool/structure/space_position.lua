\set language sql
create table positions (position_id UNSIGNED UNIQUE PRIMARY KEY NOT NULL AUTOINCREMENT, name TEXT NOT NULL, description TEXT NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, uuid TEXT NOT NULL)
