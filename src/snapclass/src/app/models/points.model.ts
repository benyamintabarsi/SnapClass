/**
 * Points object interface
 */
interface pointsInterface {
    /**
     * Points id
     */
    id: number;

    /**
     * Points point value
     */
    points: number;

    /**
     * Points description
     */
    description: string;

    /**
     * Points category id
     */
    category_id: number;
}

/**
 * Points model implements points object interface
 */
export class Points implements pointsInterface {
    
    /**
     * Construct dependencies
     * @param data assignment interface
     */
    constructor(private data: pointsInterface) { }

    /**
     * Get points id
     */
    get id(): number {
        return this.data.id;
    }

    /**
     * Get point value
     */
    get points(): number {
        return this.data.points;
    }

    /**
     * Get point description
     */
    get description(): string {
        return this.data.description;
    }

    /**
     * Get category id
     */
    get category_id(): number {
        return this.data.category_id;
    }

}