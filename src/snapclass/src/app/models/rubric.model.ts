/**
 * Rubric object interface
 */
interface rubricInterface {
    /**
     * Rubric id
     */
    id: number;

    /**
     * Rubric name
     */
    name: string;

    /**
     * Rubric description
     */
    description: string;

    /**
     * Rubric template
     */
    is_template: number;

    /**
     * Teacher ID for rubric
     */
    user_id: number;
}

/**
 * Rubric model implements rubric object interface
 */
export class Rubric implements rubricInterface {
        
    /**
     * Construct dependencies
     * @param data assignment interface
     */
    constructor(private data: rubricInterface) { }

    /**
     * Get rubric id
     */
    get id(): number {
        return this.data.id;
    }

    /**
     * Get rubric name
     */
    get name(): string {
        return this.data.name;
    }

    /**
     * Get rubric description
     */
    get description(): string {
        return this.data.description;
    }

    /**
     * Get rubric is_template
     */
    get is_template(): number {
        return this.data.is_template;
    }

    /**
     * Get teacher ID for rubric
     */
    get user_id(): number {
        return this.data.user_id;
    }
}