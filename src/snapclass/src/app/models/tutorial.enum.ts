/**
 * Enumeration to track which stage of the tutorial that is active.
 */
export enum TutorialStatus {
    Inactive = 0,
    CourseManagement = 1,
    AssignmentManagement = 2,
    GradeManagement = 3
}

/**
 * Enumeration to track which stage of the course management tutorial is active.
 */
export enum tutorialSubStatus {
    Inactive = 0,
    AddCourse = 1,
    ChangeSection = 2,
    AddSection = 3,
    EditRoster = 4,
    ChangeCourseStatus = 5,
    ViewInactiveCourse = 6
}