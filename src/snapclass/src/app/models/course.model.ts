/**
 * Couse object interface
 */
interface courseInterface {
    /**
     * Course ID
     */
    id: number;

    /**
     * Course name
     */
    name: string;

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
 export class Course implements courseInterface {
 
    /**
     * Construct dependencies
     * @param data course interface
     */
    constructor(private data: courseInterface) { }
 
    /**
     * Get course ID
     */
    get id(): number {
        return this.data.id;
    }
 
    /**
     * Get course name
     */
    get name(): string {
        return this.data.name;
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
