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
    party VARCHAR(200) not null,
    party_id INT null,
    msgs_sent INT not null
    );
---     FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL 
CREATE TABLE parties(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    party VARCHAR(200) not null,
    webpage VARCHAR(500) not null
);