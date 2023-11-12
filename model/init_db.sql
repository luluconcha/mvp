--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists politicians, parties;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE parties(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    party VARCHAR(200) null,
    webpage VARCHAR(500) null
);

CREATE TABLE politicians(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(200) not null, 
    email_address VARCHAR(200) not null,
    msgs_sent INT null,
    party VARCHAR(200) null
);

CREATE TABLE magics(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    magic VARCHAR(50) not null
);

CREATE TABLE suggestions(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    suggestion VARCHAR(50) not null
);