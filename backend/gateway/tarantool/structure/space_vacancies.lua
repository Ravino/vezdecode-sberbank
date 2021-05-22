\set language sql
CREATE TABLE vacancies (vacancy_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, division_id UNSIGNED NOT NULL, position_id UNSIGNED NOT NULL, description TEXT NOT NULL, scope TEXT NOT NULL, uuid text NOT NULL)
