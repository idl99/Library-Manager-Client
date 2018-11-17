import { LibraryItem } from './LibraryItem';

export class Reader {

    private readerId: String;
    private name: String;
    private mobile: String;
    private email: String;

    constructor(readerId: String, name: String, mobile: String, email:String) {
        this.readerId =  readerId;
        this.name = name;
        this.mobile = mobile;
        this.email = email;
    }

    public getReaderId(): String {
        return this.readerId;
    }

    public setReaderId(readerId: String): void {
        this.readerId = readerId;
    }

    public getName(): String {
        return this.name;
    }

    public setName(name: String): void {
        this.name = name;
    }

    public getMobile(): String {
        return this.mobile;
    }

    public setMobile(mobile: String): void {
        this.mobile = mobile;
    }

    public getEmail(): String {
        return this.email;
    }

    public setEmail(email: String): void {
        this.email = email;
    }

}
