--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists politicians, parties;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE politicians(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(200) not null, 
    email_address VARCHAR(200) not null,
    party VARCHAR(200) null,
    msgs_sent INT null
    );
-- ALTER TABLE politicians
-- ADD COLUMN party_id INT NOT NULL AFTER PARTY;
-- ALTER TABLE politicians FOREIGN KEY (party_id) REFERENCES parties(parties_id);

-- ALTER TABLE politicians
--  SET COLUMN party_id INT NULL;


-- ALTER TABLE politicians MODIFY COLUMN party_id INT NULL,
--  ADD CONSTRAINT parties_party_id_fk
--  FOREIGN KEY(party_id)
--  REFERENCES parties(id);

--- ALTER TABLE politicians MODIFY COLUMN party_id INT,
--- ADD CONSTRAINT FOREIGN KEY(parties_id)
--- WHERE politicians_party === parties_party

--- NONE OF THESE WORK FOR ADDING THE FOREIGN KEY TO THE POLITICIANS. will drop it for now omg how annoying is mysql

UPDATE parties (webpage) VALUES ("https://www.pp.es/actualidad/noticias") WHERE id= 3;

CREATE TABLE parties(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    party VARCHAR(200) null,
    webpage VARCHAR(500) null
);