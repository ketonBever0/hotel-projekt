class UserClass {
    id: number;
    username: string;
    email: string;
    fullname: string;
    role: string;
    enrolledBy: string | null;

    constructor(id: number, username: string, email: string, fullname: string, role: string, enrolledBy: string | null) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.fullname = fullname;
        this.enrolledBy = enrolledBy;
    }




}