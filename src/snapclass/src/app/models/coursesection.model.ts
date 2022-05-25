/**
 * Course object interface
 */
interface CourseSectionInterface {
    /**
     * Course ID
     */
    CourseId: number;

    /**
     * Section ID
     */
    SectionId: number;

    /**
     * Course name
     */
    CourseName: string;

    /**
     * Section name
     */
    SectionName: string;

    /**
     * Course description
     */
    description: string;

    /**
     * Course status
     */
    status: number;

    /**
     * Teacher ID for course
     */
    user_id: number;

    /**
     * Course start date
     */
    start_date: Date;

    /**
     * Course end date
     */
    end_date: Date;
 }

 /**
  * Implements course object interface
  */
 export class CourseSection implements CourseSectionInterface {

    /**
     * Construct dependencies
     * @param data course interface
     */
    constructor(private data: CourseSectionInterface) { }

    /**
     * Get course ID
     */
    get CourseId(): number {
        return this.data.CourseId;
    }

    /**
     * Get section ID
     */
    get SectionId(): number {
        return this.data.SectionId;
    }

    /**
     * Get course name
     */
    get CourseName(): string {
        return this.data.CourseName;
    }

    /**
     * Get section name
     */
    get SectionName(): string {
        return this.data.SectionName;
    }


    /**
     * Get course description
     */
    get description(): string {
        return this.data.description;
    }

    /**
     * Get course status
     */
    get status(): number {
        return this.data.status;
    }

    /**
     * Get teacher ID for course
     */
    get user_id(): number {
        return this.data.user_id;
    }

    /**
     * Get course start date
     */
    get start_date(): Date {
        return this.data.start_date;
    }

    /**
     * Get course end date
     */
    get end_date(): Date {
        return this.data.end_date;
    }
 }
