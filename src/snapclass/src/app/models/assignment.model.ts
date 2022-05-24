/**
 * Assignment object interface
 */
interface assignmentInterface {
    /**
     * Assignment id
     */
    id: number;

    /**
     * Assignment name
     */
    name: string;

    /**
     * Assignment description
     */
    description: string;

    /**
     * Assignment status
     */
    status: number;

    /**
     * Assignment start date
     */
    start_date: Date;

    /**
     * Assignment due date
     */
    due_date: Date;

    /**
     * Assignment rubric id
     */
    rubric_id: number;
}
/**
 * Implements assignment object interface
 */
export class Assignment implements assignmentInterface {
        
    /**
     * Construct dependencies
     * @param data assignment interface
     */
    constructor(private data: assignmentInterface) { }

    /**
     * Get assignment id
     */
    get id(): number {
        return this.data.id;
    }

     /**
     * Get assignment name
     */
    get name(): string {
        return this.data.name;
    }

     /**
     * Get assignment description
     */
    get description(): string {
        return this.data.description;
    }

    /**
     * Get assignment status
     */
    get status(): number {
        return this.data.status;
    }

    /**
     * Get assignment start date
     */
    get start_date(): Date {
        return this.data.start_date;
    }

    /**
     * Get assignment due date
     */
    get due_date(): Date {
        return this.data.due_date;
    }

    /**
     * Get assignment rubric id
     */
    get rubric_id(): number {
        return this.data.rubric_id
    }
}

