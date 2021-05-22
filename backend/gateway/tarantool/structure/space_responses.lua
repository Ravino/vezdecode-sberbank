\set language sql
CREATE TABLE responses (response_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, user_id UNSIGNED NOT NULL, vacancy_id UNSIGNED NOT NULL, status TEXT NOT NULL, uuid text NOT NULL)
