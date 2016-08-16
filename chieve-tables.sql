-- Postgres for Chieve App
-- `users` table and triggers

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	email varchar(200) NOT NULL,
	password varchar(100) NOT NULL,
	first_name varchar(255) DEFAULT NULL,
	last_name varchar(255) DEFAULT NULL,
	created_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_date timestamp NOT NULL DEFAULT '2000-01-01 00:00:00'
);

-- Function that updates timestamp for when a row was updated
CREATE OR REPLACE FUNCTION update_updated_date_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_date = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger that triggers the function when the row is updated
CREATE TRIGGER update_users_updated_date BEFORE UPDATE
    ON users FOR EACH ROW EXECUTE PROCEDURE 
    update_updated_date_column();
