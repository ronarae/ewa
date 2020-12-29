export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
    exp: number;

    constructor(id: number, name: string, email: string, role: string, password: string, exp: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.exp = exp;
    }

    public static trueCopy(user: User): User {
        // @ts-ignore
        return (user == null ? null : Object.assign(new User(), user));
    }
}
