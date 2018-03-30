export class User {

    static empty(): User {
        return new User();
    }

    private id: number = 0;
    private username: string;
    private pwd: string;

    constructor( id: number = 0, username: string = "", pwd: string = "") {

        this.id = id;
        this.username = username;
        this.pwd = pwd;
    }

    getId(): number {
        return this.id;
    }

    setId( id: number ): void {
        this.id = id;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername( username: string ): void {
        this.username = username;
    }

    getPwd(): string {
        return this.pwd;
    }

    setPwd( pwd: string ): void {
        this.pwd = pwd;
    }
}

export interface UserLiteral {
    id: number, 
    username: string;
    pwd: string;
}