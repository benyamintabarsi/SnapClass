/**
 * User object interface
 */
interface userInterface {
    /**
     * User ID
     */
    id: number;

    /**
     * User name
     */
    name: string;

    /**
     * User preferred name
     */
    preferred_name: string;

    /**
     * User username
     */
    username: string;

    /**
     * User yob
     */
    yob: number;

    /**
     * User email address
     */
    email: string;

    /**
     * Teacher active section
     */
    activeSection: number;

    /**
     * User helper role
     */
    helper: number;

    // account_type: number;
}

/**
 * Implements user object interface
 */
export class User implements userInterface {

    /**
     * Construct dependencies
     * @param data user interface
     */
    constructor(private data: userInterface) { }

    /**
     * Get user ID
     */
    get id(): number {
        return this.data.id;
    }

    /**
     * Get user name
     */
    get name(): string {
        return this.data.name;
    }

    /**
     * Get user preferred name
     */
    get preferred_name(): string {
        return this.data.preferred_name;
    }

    /**
     * Get user username
     */
    get username(): string {
        return this.data.username;
    }

    /**
     * Get yob
     */
    get yob(): number {
        return this.data.yob;
    }

    /**
     * Get email
     */
    get email(): string {
        return this.data.email;
    }

    get activeSection(): number {
        return this.data.activeSection;
    }

    get helper(): number {
        return this.data.helper;
    }

    // get accountType() : number {
    //     return this.data.account_type;
    // }
    //
    // setAccountType(num) {
    //     this.data.account_type = num;
    // }
    //
    setActiveSection(activeSection) {
         this.data.activeSection = activeSection;
     }

}
