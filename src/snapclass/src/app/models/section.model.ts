/**
 * Section object interface
 */
interface sectionInterface {
    /**
     * Section ID
     */
    id: number;
    
    /**
     * Section name
     */
    section_number: string;

    /**
     * ID of corresponding course
     */
    course_id: number;
 }
 
 /**
  * Implement section object interface
  */
 export class Section implements sectionInterface {
 
    /**
     * Construct dependencies
     * @param data section interface
     */
    constructor(private data: sectionInterface) { }
 
    /**
     * Get section ID
     */
    get id(): number {
        return this.data.id;
    }
 
    /**
     * Get section name
     */
    get section_number(): string {
        return this.data.section_number;
    }
 
    /**
     * Get course ID for section
     */
    get course_id(): number {
        return this.data.course_id;
    }
 }