\set language sql

CREATE TRIGGER update_responses_after_delete_vacancy AFTER DELETE ON vacancies FOR EACH ROW BEGIN UPDATE responses SET status='canceled' where vacancy_id=OLD.vacancy_id; END;
