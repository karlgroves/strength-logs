SET GLOBAL time_zone = '+0:00';

CREATE DATABASE `strengthlogs`
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$uP3rm4n!';

GRANT ALL PRIVILEGES ON strengthlogs.* TO 'root'@'localhost';

USE strengthlogs;

CREATE TABLE `users` (
    `userID`       VARCHAR(36) NOT NULL,
    `userEmail`    TEXT        NOT NULL,
    `userPassword` VARCHAR(72) NOT NULL,
    `userConfirmed` ENUM('0','1') DEFAULT '0',
    `isAdmin` ENUM('0','1') DEFAULT '0',
    PRIMARY KEY `userID` (`userID`)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `exercises` (
    `exerciseID`   VARCHAR(36)  NOT NULL,
    `exerciseName` VARCHAR(255) NOT NULL,
    `userID`       VARCHAR(36) NOT NULL,
    PRIMARY KEY `exerciseID` (`exerciseID`),
    KEY `userID` (`userID`)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


CREATE TABLE `traininglogs` (
    `trainingLogID` VARCHAR(36) NOT NULL,
    `userID`        VARCHAR(36) NOT NULL,
    `exerciseID`    VARCHAR(36) NOT NULL,
    `sets`          INT         NOT NULL,
    `reps`          INT         NOT NULL,
    `weight`        INT         NOT NULL,
    `dateAdded`     DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY `trainingLogID` (`trainingLogID`),
    KEY `userID` (`userID`),
    KEY `exerciseID` (`exerciseID`)

)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO users (userID, userEmail, userPassword, userConfirmed, isAdmin) VALUES
    ('207fd15a-316d-4b4a-9797-dc5ec5d56f82', 'karlgroves@gmail.com',
     '$2a$12$un28Q8L0um91iAQ6aPplbeI6vkF.Nry0Y7aFo03zXmVxnHNDd4qvS', '1', '1');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('69f3725f-da1d-429e-ac7b-15e55755e10d', 'Barbell Bench Press');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('74420618-831b-46fa-9961-f61e0bda1d0e', 'Barbell Squats');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('6ba4d16e-e105-4b6f-8d87-dfc838c07940', 'Barbell Deadlifts');

INSERT INTO exercises (exerciseID, exerciseName)
VALUES ('5edf042e-ffc9-4c79-97ec-b2fb0452681d', 'Dumbbell Bench Press');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('34abc44d-0553-40da-ad86-8c847a93dc1d', 'Barbell Curls');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('c5712a74-5bf0-4512-bd6e-a84fdefebf74', 'Dumbbell Curls');

INSERT INTO exercises (exerciseID, exerciseName)
VALUES ('d21155bc-6bb4-4d70-a51d-9f45488d724d', 'Barbell Overhead Press');

INSERT INTO exercises (exerciseID, exerciseName)
VALUES ('0378c4c9-f26f-4dba-a3dd-40103bed086c', 'Dumbbell Overhead Press');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('3aeffc58-f3e5-4a65-9c71-d993cb550ae0', 'Barbell Front Squat');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('56f2e4b2-a88d-4369-9c60-2059e7d0252e', 'Leg Press');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('f4690875-a63e-4e1f-a9c3-bccc70713b4e', 'Leg Extensions');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('c71abb02-05ab-4cb7-8a84-a6675b6ad17f', 'Leg Curls');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('45335b7d-0f5b-4529-a40a-901275906d64', 'Barbell Shrugs');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('2e750ff2-1f40-4279-b7c2-7fb0dd705712', 'Dumbbell Shrugs');

INSERT INTO exercises (exerciseID, exerciseName)
VALUES ('5c213cc2-e4f5-48d5-9904-a3a051d4d835', 'Standing Calf Raises');

INSERT INTO exercises (exerciseID, exerciseName)
VALUES ('836e59bd-cb21-4f12-974c-1a606c111cf6', 'Barbell Front Squats');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('e26f45a9-a4f2-4096-8d28-9f4cfcdba48e', 'Lat Pulls');

INSERT INTO exercises (exerciseID, exerciseName)
VALUES ('f145c78a-09fb-4833-ac96-7c96047b8f48', 'Tricep Cable Pulldowns');

INSERT INTO exercises (exerciseID, exerciseName)
VALUES ('395d1698-fe6c-43c3-9c1e-6f66ac07fdb3', 'Barbell Tricep Extensions');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('1d91f558-4340-48ba-8aac-9da353cd0054', 'Cable Front Raises');

INSERT INTO exercises (exerciseID, exerciseName) VALUES ('ef61d084-ead8-4dab-81b0-b0068778b4c6', 'Cable Side Raises');


