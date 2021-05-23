\set language sql

create table comments (comment_id UNSIGNED UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT, type TEXT NOT  NULL, body TEXT NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, uuid TEXT NOT NULL)
