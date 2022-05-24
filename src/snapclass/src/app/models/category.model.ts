import { Points } from './points.model';

/**
 * Category object interface
 */
interface categoryInterface {
    /**
     * Category id
     */
    id: number;

    /**
     * Category name
     */
    name: string;

    /**
     * Category learning objective
     */
    learning_objective: string;
    
    /**
     * Category min points
     */
    min_point: number;
    
    /**
     * Category max points
     */
    max_point: number;
    
    /**
     * Category point scale
     */
    point_scale:number;

    /**
     * Category points
     */
    points: Points[];
}

/**
 * Category modeal implements category object interface
 */
export class Category implements categoryInterface {
    /**
     * Construct dependencies
     * @param data category interface
     */
    constructor(private data: categoryInterface) { }

    /**
     * Get category id
     */
    get id(): number {
        return this.data.id;
    }
    
    /**
     * Get category name
     */
    get name(): string {
        return this.data.name;
    }

    /**
     * Get category learning objective
     */
    get learning_objective(): string {
        return this.data.learning_objective;
    }

    /**
     * Get points for category
     */
    get points(): Points[] {
        return this.data.points;
    }

    /**
     * Get max point for category
     */
    get max_point(): number {
        return this.data.max_point;
    }


    /**
     * Get min point for category
     */
    get min_point(): number {
        return this.data.min_point;
    }

    /**
     * Get category points scale
     */
    get point_scale(): number {
        return this.data.point_scale;
    }
}