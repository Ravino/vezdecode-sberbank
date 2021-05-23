\set language sql

CREATE TRIGGER comment_bind_response_after_update AFTER UPDATE ON responses FOR EACH ROW BEGIN UPDATE responses SET comment_id=(select comment_id from comments where type=OLD.status)  where response_id=OLD.response_id; END;
