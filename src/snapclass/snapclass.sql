--
-- Database: `snapclass`
--

-- --------------------------------------------------------

--
-- Drop database
--
DROP DATABASE IF EXISTS snapclass;

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

--
-- Create database
--
CREATE DATABASE IF NOT EXISTS snapclass;

USE snapclass;

--
-- This table represents the logs
--
CREATE TABLE IF NOT EXISTS `logs` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `time` VARCHAR(255) NOT NULL,
    `event_type` VARCHAR(255) NOT NULL,
     PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 CREATE TABLE IF NOT EXISTS `school` (
  `school_id` varchar(255) NOT NULL COMMENT 'A unique identifier for the school, nces id for public k-12 schools',
  `school_name` varchar(255) NOT NULL COMMENT 'A front facing name for the school',
  `street_address` varchar(255) NOT NULL COMMENT 'The street address of the school',
  `city` varchar(255) NOT NULL COMMENT 'The city where the school is in',
  `county` varchar(255) NOT NULL COMMENT 'The county the school is in',
  `state` varchar(255) COMMENT 'The state the school is in, acronym ',
  `zip` varchar(10) COMMENT 'The zip code of the school',
  PRIMARY KEY (school_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- This table represents a "student" or "teacher" user
--
CREATE TABLE IF NOT EXISTS `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `preferred_name` varchar(255),
    -- `pswd` varchar(255) NOT NULL,
    `yob` int(4),
    `account_type` int(11),
    `email` varchar(255) COMMENT 'email address to reset password',
    `school_id` varchar(255) COMMENT 'NCES school id or a unique school identifier',
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `consent` (
  `consent_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'A unique identifier for the assignment.',
  `user_id` int COMMENT 'A unique identifier that follows a user',
  `consent_date` datetime NOT NULL COMMENT 'The name of the assignment file',
  `consent` tinyint(1) NOT NULL COMMENT 'If we have student consent to look at the data',
  PRIMARY KEY (consent_id),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  INDEX (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- This is the "role" table and defines role types.
-- Currently, roles are : "Teacher", "Student", and "Admin".
--
CREATE TABLE IF NOT EXISTS `role` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `role_name` ENUM('Teacher', 'Student','Admin') NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- This is the "role" table and defines role types.
-- Currently, roles are : "Teacher", "Student", and "Admin".
--
CREATE TABLE IF NOT EXISTS `role_for_user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int,
    `role_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
    FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `course` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `status` int(11) NOT NULL,
    `description` varchar(255),
    `user_id` int,
    `start_date` DATE,
    `end_date` DATE,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `section` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `section_number` varchar(4) NOT NULL,
    `course_id` int,
    `last_modified` Date,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `active_section` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `section_id` int NOT NULL,
    `user_id` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    UNIQUE(`section_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `rubric` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255),
    `is_template` tinyint(1) NOT NULL,
    `user_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `category` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `learning_objective` varchar(255) NOT NULL,
    `min_point` int,
    `max_point` int,
    `point_scale` int,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `category_for_rubric` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `rubric_id` int,
    `category_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`rubric_id`) REFERENCES `rubric` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
    UNIQUE(`rubric_id`, `category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `points_for_category` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `points` DECIMAL(5,2) NOT NULL,
    `description` varchar(255),
    `category_id` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `assignment` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `status` ENUM('Active', 'Inactive','Archived') NOT NULL,
    `start_date` date NOT NULL,
    `due_date` date NOT NULL,
    `rubric_id` int,
    `environment` varchar(50) NOT NULL COMMENT 'The programming environment of the assignment',
    `assignment_file_name` varchar(255) COMMENT 'The name of the assignment file',
    `instruction_file_name` varchar(255) COMMENT 'The name of instruction pdf file',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`rubric_id`) REFERENCES `rubric` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `assignments_in_section` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `section_id` int,
    `assignment_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`id`) ON DELETE CASCADE,
    UNIQUE(`section_id`, `assignment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `students_in_section` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `section_id` int,
    `user_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    UNIQUE(`section_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `category_for_teacher` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int,
    `category_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `submission` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `submission_code` MEDIUMTEXT NOT NULL,
    `assignment_id` int,
    `user_id` int,
    `is_submitted` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `assignment_overall_grade_total` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `assignment_feedback` varchar(511),
    `grade_total` DECIMAL(5,2),
    `point_for_category` int,
    `user_id` int,
    `assignment_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`point_for_category`) REFERENCES `points_for_category` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
