--
-- Database: `snapclass`
--

-- --------------------------------------------------------

--
-- Mock data for database
/*
How to use:
1. WARNING: This will clear your snapclass db in mariadb. Load snapclass.sql to drop snapclass db and rebuild empty tables with "mysql -u root -p snapclass < snapclass.sql"
2. Then load mockdata.sql with "mysql -u root -p snapclass < snapclass_mockdata.sql"
3. Check tables with "SELECT * FROM table_name_here;"
*/

USE snapclass;

--
-- One Login Log
--
INSERT INTO `logs` SET
    `username` = 't1@test.com',
    `time` = '2011-05-25 17:29:44.763',
    `event_type` = 'login'
;

--
-- New "school" table inserts
--
INSERT INTO `school` SET
  `school_id` = 'ncsuschoolid',
  `school_name` = 'ncsu',
  `street_address` = 'Hillsborough',
  `city` = 'Raleigh',
  `county` = 'Wake',
  `state` = 'NC',
  `zip` = '27695'
;

INSERT INTO `school` SET
  `school_id` = 'abcdschoolid',
  `school_name` = 'abcd',
  `street_address` = 'Abcd St',
  `city` = 'Raleigh',
  `county` = 'Wake',
  `state` = 'NC',
  `zip` = '00001'
;

--
-- New "user" table inserts
--
INSERT INTO `user` SET
    `name`  = 'teacher1',
    `preferred_name`  = 'teacher1',
    `username`  = 'scteacher1',
    `yob` = 2000,
    `account_type` = '1',
    `school_id` = 'ncsuschoolid',
    `email`  = 'game2learnlab@ncsu.edu'
    -- Password: snapclass
;

INSERT INTO `user` SET
    `name` = 'teacher2',
    `preferred_name` = 'teacher2',
    `username` = 'scteacher2',
    `yob` = 2000,
    `account_type` = '1',
    `school_id` = 'ncsuschoolid',
    `email`  = 'game2learnlab@ncsu.edu'
    -- Password: snapclass
;

INSERT INTO `user` SET
    `name` = 'V. Catete',
    `preferred_name` = 'Dr. Catete',
    `username` = 'vc@test.com',
    `yob` = 2002,
    `account_type` = '1',
    `school_id` = 'ncsuschoolid',
    `email`  = 'game2learnlab@ncsu.edu'
;

INSERT INTO `user` SET
    `name` = 'A. Milliken',
    `preferred_name` = 'Dr. Milliken',
    `username` = 'am@test.com',
    `yob` = 2002,
    `account_type` = '1',
    `school_id` = 'ncsuschoolid',
    `email`  = 'game2learnlab@ncsu.edu'
;

INSERT INTO `user` SET
    `username` = 'scstudent1',
    `name` = 'student1',
    `preferred_name` = 'student1',
    `yob` = 2001,
    `email` = 'game2learnlab@ncsu.edu',
    `account_type` = '2',
    `school_id` = 'ncsuschoolid'
;

INSERT INTO `user` SET
    `username` = 'scstudent2',
    `name` = 'student2',
    `preferred_name` = 'student2',
    `yob` = 2001,
    `email` = 'game2learnlab@ncsu.edu',
    `account_type` = '2',
    `school_id` = 'ncsuschoolid'
;

INSERT INTO `user` SET
    `username` = 'scstudent3',
    `name` = 'student3',
    `preferred_name` = 'student3',
    `yob` = 2002,
    `email` = 'game2learnlab@ncsu.edu',
    `account_type` = '2',
    `school_id` = 'ncsuschoolid'
;

INSERT INTO `user` SET
    `username` = 'gdsimco',
    `name` = 'Garrett Simco',
    `preferred_name` = 'Garrett Simco',
    `yob` = 2000,
    `email` = 'game2learnlab@ncsu.edu',
    `account_type` = '2',
    `school_id` = 'ncsuschoolid'
;

INSERT INTO `consent` SET
    `user_id` = 5,
    `consent_date` = '2019-09-10 00:00:01',
    `consent` = 1
;

INSERT INTO `consent` SET
    `user_id` = 6,
    `consent_date` = '2020-09-10 00:00:04',
    `consent` = 0
;

INSERT INTO `consent` SET
    `user_id` = 7,
    `consent_date` = '2018-10-10 00:00:05',
    `consent` = 1
;


INSERT INTO `role` SET
    `role_name` = 'Teacher' -- this *should* insert as id 1 in the role table
;

INSERT INTO `role` SET
    `role_name` = 'Student' -- this *should* insert as id 2 in the role table
;

INSERT INTO `role` SET
    `role_name` = 'Admin' -- this *should* insert as id 3 in the role table
;

INSERT INTO `role_for_user` SET
    `user_id` = 1, -- this *should* be teacher1
    `role_id` = 1 -- this *should* be the "Teacher" role
;

INSERT INTO `role_for_user` SET
    `user_id` = 2, -- this *should* be teacher2
    `role_id` = 1 -- this *should* be the "Teacher" role
;

INSERT INTO `role_for_user` SET
    `user_id` = 3, -- this *should* be teacher VC
    `role_id` = 1 -- this *should* be the "Teacher" role
;

INSERT INTO `role_for_user` SET
    `user_id` = 4, -- this *should* be teacher AM
    `role_id` = 1 -- this *should* be the "Teacher" role
;

INSERT INTO `role_for_user` SET
    `user_id` = 5, -- this *should* be student1
    `role_id` = 2 -- this *should* be the "Student" role
;

INSERT INTO `role_for_user` SET
    `user_id` = 6, -- this *should* be student2
    `role_id` = 2 -- this *should* be the "Student" role
;

INSERT INTO `role_for_user` SET
    `user_id` = 7, -- this *should* be student3
    `role_id` = 2 -- this *should* be the "Student" role
;

INSERT INTO `role_for_user` SET
    `user_id` = 8, -- this *should* be student3
    `role_id` = 2 -- this *should* be the "Student" role
;

/*
CREATE TABLE IF NOT EXISTS `course` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `status` int(11) NOT NULL,
    `user_id` int,
    `start_date` DATE,
    `end_date` DATE,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `teacher` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/
INSERT INTO `course` SET
    `name` = 'AP CS-01',
    `status` = '01',
    `description` = 'Intro CS I',
    `user_id` = 1,
    `start_date` = DATE '2019-08-15',
    `end_date` = DATE '2019-12-15'
;

INSERT INTO `course` SET
    `name` = 'AP CS-03',
    `status` = '01',
    `description` = 'Intro CS III',
    `user_id` = 1,
    `start_date` = DATE '2019-08-15',
    `end_date` = DATE '2019-12-15'
;

INSERT INTO `course` SET
    `name` = 'AP CS-02',
    `status` = '02',
    `description` = 'Intro CS II',
    `user_id` = 2,
    `start_date` = DATE '2020-01-15',
    `end_date` = DATE '2020-05-15'
;

/*
CREATE TABLE IF NOT EXISTS `section` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `section_number` varchar(4) NOT NULL,
    `course_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `section` SET
    `section_number` = '001H',
    `course_id` = 1
;

INSERT INTO `section` SET
    `section_number` = '002',
    `course_id` = 1
;

INSERT INTO `section` SET
    `section_number` = '003',
    `course_id` = 1
;

INSERT INTO `section` SET
    `section_number` = '001',
    `course_id` = 2
;

INSERT INTO `section` SET
    `section_number` = '002H',
    `course_id` = 2
;

/**
CREATE TABLE IF NOT EXISTS `active_section` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `section_id` int NOT NULL,
    `user_id` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    UNIQUE(`section_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `active_section` SET
    `section_id` = 1,
    `user_id` = 1
;

INSERT INTO `active_section` SET
    `section_id` = 2,
    `user_id` = 2
;

/*
CREATE TABLE IF NOT EXISTS `rubric` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255),
    `is_template` tinyint(1) NOT NULL,
    `user_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `rubric` SET
    `name` = 'Rubric 1',
    `description` = 'Description for rubric 1',
    `is_template` = 0,
    `user_id` = 1
;

INSERT INTO `rubric` SET
    `name` = 'Rubric 2 Template',
    `description` = 'Description for rubric 2',
    `is_template` = 1
;

/*
CREATE TABLE IF NOT EXISTS `category` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `learning_objective` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `category` SET
    `name` = 'Abstraction',
    `learning_objective` = 'EK 2.2.1C Abstraction generalizes...',
    `min_point` = 0,
    `max_point` = 15,
    `point_scale` = 1
;

INSERT INTO `category` SET
    `name` = 'Visual',
    `learning_objective` = 'EK 5.4.1H Visual displays...',
    `min_point` = 0,
    `max_point` = 7,
    `point_scale` = 5
;

/*
CREATE TABLE IF NOT EXISTS `category_for_rubric` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `rubric_id` int,
    `category_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`rubric_id`) REFERENCES `rubric` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
    UNIQUE(`rubric_id`, `category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `category_for_rubric` SET
    `rubric_id` = 1,
    `category_id` = 1
;

INSERT INTO `category_for_rubric` SET
    `rubric_id` = 1,
    `category_id` = 2
;

INSERT INTO `category_for_rubric` SET
    `rubric_id` = 2,
    `category_id` = 1
;

INSERT INTO `category_for_rubric` SET
    `rubric_id` = 2,
    `category_id` = 2
;

/*
CREATE TABLE IF NOT EXISTS `points_for_category` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `points` DECIMAL(5,2) NOT NULL,
    `description` varchar(255),
    `category_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `points_for_category` SET
    `points` = 10.75,
    `description` = 'Completing the assignment with minimal errors...',
    `category_id` = 1
;

INSERT INTO `points_for_category` SET
    `points` = 15.00,
    `description` = 'Completing the assignment with zero errors...',
    `category_id` = 1
;

INSERT INTO `points_for_category` SET
    `points` = 5.00,
    `description` = 'Completing the assignment with several errors...',
    `category_id` = 2
;

INSERT INTO `points_for_category` SET
    `points` = 7.00,
    `description` = 'Completing the assignment with minimal errors...',
    `category_id` = 2
;

/*
CREATE TABLE IF NOT EXISTS `assignment` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `status` ENUM('Active', 'Inactive','Archived') NOT NULL,
    `start_date` date,
    `due_date` date,
    `rubric_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`rubric_id`) REFERENCES `rubric` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `assignment` SET
    `name` = 'Assignment 1',
    `description` = 'This is the description for assignment 1...',
    `assignment_file_name`  = 'Day1Activity1',
    `status` = 'Active',
    `environment` = 'Snap',
    `start_date` = DATE '2019-09-01',
    `due_date` = DATE '2019-09-08',
    `rubric_id` = 1
;

INSERT INTO `assignment` SET
    `name` = 'Assignment 2',
    `description` = 'This is the description for assignment 2...',
    `assignment_file_name`  = 'Day_1_Introduce_Yourself_Begin.xml',
    `status` = 'Inactive',
    `environment` = 'Snap',
    `start_date` = DATE '2019-09-08',
    `due_date` = DATE '2019-09-15',
    `rubric_id` = 2
;

INSERT INTO `assignment` SET
    `name` = 'For Loop',
    `description` = 'This is the description for for looping',
    `assignment_file_name`  = 'Day_3_Epidemics_Begin.xml',
    `status` = 'Active',
    `environment` = 'Snap',
    `start_date` = DATE '2019-09-08',
    `due_date` = DATE '2019-02-15',
    `rubric_id` = 2
;

INSERT INTO `assignment` SET
    `name` = 'Brick Breaker',
    `description` = 'This is the description for brick breaking',
    `assignment_file_name`  = 'Day_2_Graphing_Coordinates_Begin.xml',
    `status` = 'Active',
    `environment` = 'Snap',
    `start_date` = DATE '2019-09-08',
    `due_date` = DATE '2019-02-20',
    `rubric_id` = 2
;

INSERT INTO `assignment` SET
    `name` = 'Turtles',
    `description` = 'This is the description for turtling',
    `assignment_file_name`  = 'Day_2_Graphing_Coordinates_Begin.xml',
    `status` = 'Active',
    `environment` = 'Snap',
    `start_date` = DATE '2019-09-08',
    `due_date` = DATE '2019-02-25',
    `rubric_id` = 2
;

INSERT INTO `assignment` SET
    `name` = 'While Loops',
    `description` = 'This is the description for while looping',
    `status` = 'Active',
    `environment` = 'Snap',
    `start_date` = DATE '2019-09-08',
    `due_date` = DATE '2019-09-25',
    `rubric_id` = 2
;

INSERT INTO `assignment` SET
    `name`  = 'Cellular starter',
    `description` = 'Introducing simulation in cellular',
    `assignment_file_name`  = 'Day_3_Epidemics_Begin.xml',
    `status` = 'Active',
    `environment` = 'Cellular',
    `start_date` = '2019-07-27',
    `due_date` = '2019-08-02',
    `rubric_id` = 1
;

/*
CREATE TABLE IF NOT EXISTS `assignments_in_section` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `section_id` int,
    `assignment_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `assignments_in_section` SET
    `section_id` = 1,
    `assignment_id` = 1
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 1,
    `assignment_id` = 2
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 2,
    `assignment_id` = 1
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 2,
    `assignment_id` = 2
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 3,
    `assignment_id` = 1
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 3,
    `assignment_id` = 2
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 1,
    `assignment_id` = 3
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 1,
    `assignment_id` = 4
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 1,
    `assignment_id` = 5
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 4,
    `assignment_id` = 6
;

INSERT INTO `assignments_in_section` SET
    `section_id` = 1,
    `assignment_id` = 7
;
/*
CREATE TABLE IF NOT EXISTS `students_in_section` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `section_id` int,
    `user_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `students_in_section` SET
    `section_id` = 1,
    `user_id` = 5
;

INSERT INTO `students_in_section` SET
    `section_id` = 1,
    `user_id` = 6
;

INSERT INTO `students_in_section` SET
    `section_id` = 1,
    `user_id` = 7
;


INSERT INTO `students_in_section` SET
    `section_id` = 4,
    `user_id` = 5
;

INSERT INTO `students_in_section` SET
    `section_id` = 2,
    `user_id` = 2
;


INSERT INTO `students_in_section` SET
    `section_id` = 3,
    `user_id` = 1
;

INSERT INTO `students_in_section` SET
    `section_id` = 3,
    `user_id` = 2
;

/*
CREATE TABLE IF NOT EXISTS `category_for_teacher` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int,
    `category_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `category_for_teacher` SET
    `user_id` = 1,
    `category_id` = 1
;

INSERT INTO `category_for_teacher` SET
    `user_id` = 2,
    `category_id` = 2
;

/*
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
*/

INSERT INTO `submission` SET
    `submission_code` = '<project name="test" app="Snap! 4.2, http://snap.berkeley.edu" version="1"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAACpklEQVR4Xu3XQaoaQQBF0ep96FyXo+CGnLggxdXoRnTQASFk8POTkEFfaI7jhkfdOtg6zfM8Dx8FogITgFF5s58CAIKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAPhN/v1+P87n8zidTukFrX0cwD/c8PF4HPM8f554PB7jfr+P7Xa7dhOLng/Av+Q+HA5fnpimabzf73G9Xhe9rDWOAfifAF+v17jdbms0seiZAPzHV/Dz+fy8gjebzaIXtPYxAL+54d1uNy6Xy/jdK3jtKJY8H4BL1rb19ff0/PNvnjgKBAV8AwbRTf4qACANaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xv/ASteArcSbq6lAAAAAElFTkSuQmCC</thumbnail><stage name="Stage" width="480" height="360" costume="0" tempo="60" threadsafe="false" lines="round" ternary="true" codify="false" inheritance="true" sublistIDs="false" scheduled="false" id="1"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAOhUlEQVR4Xu3VwQkAAAjEMN1/abewn7jAQRC64wgQIECAAIF3gX1fNEiAAAECBAiMAHsCAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQIHLFxAWmhEwHPAAAAAElFTkSuQmCC</pentrails><costumes><list id="2"></list></costumes><sounds><list id="3"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites><sprite name="Sprite" idx="1" x="0" y="0" heading="90" scale="1" rotation="1" draggable="true" costume="0" color="80,80,80" pen="tip" id="8"><costumes><list id="9"></list></costumes><sounds><list id="10"></list></sounds><blocks></blocks><variables></variables><scripts><script x="56" y="158"><block s="turn"><l>15</l></block></script></scripts></sprite></sprites></stage><hidden></hidden><headers></headers><code></code><blocks></blocks><variables></variables></project>',
    `assignment_id` = 1,
    `user_id` = 5,
    `is_submitted` = 0
;

INSERT INTO `submission` SET
    `submission_code` = '<project name="test" app="Snap! 4.2, http://snap.berkeley.edu" version="1"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAACpklEQVR4Xu3XQaoaQQBF0ep96FyXo+CGnLggxdXoRnTQASFk8POTkEFfaI7jhkfdOtg6zfM8Dx8FogITgFF5s58CAIKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAPhN/v1+P87n8zidTukFrX0cwD/c8PF4HPM8f554PB7jfr+P7Xa7dhOLng/Av+Q+HA5fnpimabzf73G9Xhe9rDWOAfifAF+v17jdbms0seiZAPzHV/Dz+fy8gjebzaIXtPYxAL+54d1uNy6Xy/jdK3jtKJY8H4BL1rb19ff0/PNvnjgKBAV8AwbRTf4qACANaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xv/ASteArcSbq6lAAAAAElFTkSuQmCC</thumbnail><stage name="Stage" width="480" height="360" costume="0" tempo="60" threadsafe="false" lines="round" ternary="true" codify="false" inheritance="true" sublistIDs="false" scheduled="false" id="1"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAOhUlEQVR4Xu3VwQkAAAjEMN1/abewn7jAQRC64wgQIECAAIF3gX1fNEiAAAECBAiMAHsCAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQIHLFxAWmhEwHPAAAAAElFTkSuQmCC</pentrails><costumes><list id="2"></list></costumes><sounds><list id="3"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites><sprite name="Sprite" idx="1" x="0" y="0" heading="90" scale="1" rotation="1" draggable="true" costume="0" color="80,80,80" pen="tip" id="8"><costumes><list id="9"></list></costumes><sounds><list id="10"></list></sounds><blocks></blocks><variables></variables><scripts><script x="56" y="158"><block s="turn"><l>15</l></block></script></scripts></sprite></sprites></stage><hidden></hidden><headers></headers><code></code><blocks></blocks><variables></variables></project>',
    `assignment_id` = 1,
    `user_id` = 6,
    `is_submitted` = 1
;

INSERT INTO `submission` SET
    `submission_code` = '<project name="test" app="Snap! 4.2, http://snap.berkeley.edu" version="1"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAACpklEQVR4Xu3XQaoaQQBF0ep96FyXo+CGnLggxdXoRnTQASFk8POTkEFfaI7jhkfdOtg6zfM8Dx8FogITgFF5s58CAIKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAPhN/v1+P87n8zidTukFrX0cwD/c8PF4HPM8f554PB7jfr+P7Xa7dhOLng/Av+Q+HA5fnpimabzf73G9Xhe9rDWOAfifAF+v17jdbms0seiZAPzHV/Dz+fy8gjebzaIXtPYxAL+54d1uNy6Xy/jdK3jtKJY8H4BL1rb19ff0/PNvnjgKBAV8AwbRTf4qACANaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xv/ASteArcSbq6lAAAAAElFTkSuQmCC</thumbnail><stage name="Stage" width="480" height="360" costume="0" tempo="60" threadsafe="false" lines="round" ternary="true" codify="false" inheritance="true" sublistIDs="false" scheduled="false" id="1"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAOhUlEQVR4Xu3VwQkAAAjEMN1/abewn7jAQRC64wgQIECAAIF3gX1fNEiAAAECBAiMAHsCAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQIHLFxAWmhEwHPAAAAAElFTkSuQmCC</pentrails><costumes><list id="2"></list></costumes><sounds><list id="3"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites><sprite name="Sprite" idx="1" x="0" y="0" heading="90" scale="1" rotation="1" draggable="true" costume="0" color="80,80,80" pen="tip" id="8"><costumes><list id="9"></list></costumes><sounds><list id="10"></list></sounds><blocks></blocks><variables></variables><scripts><script x="56" y="158"><block s="turn"><l>15</l></block></script></scripts></sprite></sprites></stage><hidden></hidden><headers></headers><code></code><blocks></blocks><variables></variables></project>',
    `assignment_id` = 2,
    `user_id` = 5,
    `is_submitted` = 1
;

INSERT INTO `submission` SET
    `submission_code` = '<project name="test" app="Snap! 4.2, http://snap.berkeley.edu" version="1"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAACpklEQVR4Xu3XQaoaQQBF0ep96FyXo+CGnLggxdXoRnTQASFk8POTkEFfaI7jhkfdOtg6zfM8Dx8FogITgFF5s58CAIKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAPhN/v1+P87n8zidTukFrX0cwD/c8PF4HPM8f554PB7jfr+P7Xa7dhOLng/Av+Q+HA5fnpimabzf73G9Xhe9rDWOAfifAF+v17jdbms0seiZAPzHV/Dz+fy8gjebzaIXtPYxAL+54d1uNy6Xy/jdK3jtKJY8H4BL1rb19ff0/PNvnjgKBAV8AwbRTf4qACANaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xv/ASteArcSbq6lAAAAAElFTkSuQmCC</thumbnail><stage name="Stage" width="480" height="360" costume="0" tempo="60" threadsafe="false" lines="round" ternary="true" codify="false" inheritance="true" sublistIDs="false" scheduled="false" id="1"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAOhUlEQVR4Xu3VwQkAAAjEMN1/abewn7jAQRC64wgQIECAAIF3gX1fNEiAAAECBAiMAHsCAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQIHLFxAWmhEwHPAAAAAElFTkSuQmCC</pentrails><costumes><list id="2"></list></costumes><sounds><list id="3"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites><sprite name="Sprite" idx="1" x="0" y="0" heading="90" scale="1" rotation="1" draggable="true" costume="0" color="80,80,80" pen="tip" id="8"><costumes><list id="9"></list></costumes><sounds><list id="10"></list></sounds><blocks></blocks><variables></variables><scripts><script x="56" y="158"><block s="turn"><l>15</l></block></script></scripts></sprite></sprites></stage><hidden></hidden><headers></headers><code></code><blocks></blocks><variables></variables></project>',
    `assignment_id` = 2,
    `user_id` = 6,
    `is_submitted` = 0
;

INSERT INTO `submission` SET
    `submission_code` = '<project name="test" app="Snap! 4.2, http://snap.berkeley.edu" version="1"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAACpklEQVR4Xu3XQaoaQQBF0ep96FyXo+CGnLggxdXoRnTQASFk8POTkEFfaI7jhkfdOtg6zfM8Dx8FogITgFF5s58CAIKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAPhN/v1+P87n8zidTukFrX0cwD/c8PF4HPM8f554PB7jfr+P7Xa7dhOLng/Av+Q+HA5fnpimabzf73G9Xhe9rDWOAfifAF+v17jdbms0seiZAPzHV/Dz+fy8gjebzaIXtPYxAL+54d1uNy6Xy/jdK3jtKJY8H4BL1rb19ff0/PNvnjgKBAV8AwbRTf4qACANaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xsHkIG0AIBpfuMAMpAWADDNbxxABtICAKb5jQPIQFoAwDS/cQAZSAsAmOY3DiADaQEA0/zGAWQgLQBgmt84gAykBQBM8xv/ASteArcSbq6lAAAAAElFTkSuQmCC</thumbnail><stage name="Stage" width="480" height="360" costume="0" tempo="60" threadsafe="false" lines="round" ternary="true" codify="false" inheritance="true" sublistIDs="false" scheduled="false" id="1"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAOhUlEQVR4Xu3VwQkAAAjEMN1/abewn7jAQRC64wgQIECAAIF3gX1fNEiAAAECBAiMAHsCAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQIHLFxAWmhEwHPAAAAAElFTkSuQmCC</pentrails><costumes><list id="2"></list></costumes><sounds><list id="3"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites><sprite name="Sprite" idx="1" x="0" y="0" heading="90" scale="1" rotation="1" draggable="true" costume="0" color="80,80,80" pen="tip" id="8"><costumes><list id="9"></list></costumes><sounds><list id="10"></list></sounds><blocks></blocks><variables></variables><scripts><script x="56" y="158"><block s="turn"><l>15</l></block></script></scripts></sprite></sprites></stage><hidden></hidden><headers></headers><code></code><blocks></blocks><variables></variables></project>',
    `assignment_id` = 1,
    `user_id` = 2,
    `is_submitted` = 1
;

/*
CREATE TABLE IF NOT EXISTS `assignment_overall_grade_total` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `assignment_feedback` varchar(255),
    `grade_total` DECIMAL(5,2),
    `point_for_category` int,
    `user_id` int,
    `assignment_id` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`point_for_category`) REFERENCES `points_for_category` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

INSERT INTO `assignment_overall_grade_total` SET
    `user_id` = 5,
    `assignment_id` = 1,
    `grade_total` = 100,
    `assignment_feedback` = 'Great job!',
    `point_for_category` = 1
;

INSERT INTO `assignment_overall_grade_total` SET
    `user_id` = 5,
    `assignment_id` = 1,
    `grade_total` = 100,
    `assignment_feedback` = 'Great job!',
    `point_for_category` = 4
;

INSERT INTO `assignment_overall_grade_total` SET
    `user_id` = 6,
    `assignment_id` = 1,
    `grade_total` = 50,
    `assignment_feedback` = 'Not so great job :(',
    `point_for_category` = 1
;

INSERT INTO `assignment_overall_grade_total` SET
    `user_id` = 6,
    `assignment_id` = 1,
    `grade_total` = 50,
    `assignment_feedback` = 'Not so great job :(',
    `point_for_category` = 3
;
