import { Reader } from './Reader';

export abstract class LibraryItem {

    protected isbn: String;
    protected title: String;
    protected section: String;
    protected pubDate: Date;
    protected currentReader: Reader;
    protected borrowedOn: Date;

    constructor(isbn: String, title: String, section: String,
                    pubDate: Date, currentReader: Reader, borrowedOn: Date) {
        this.isbn = isbn;
        this.title = title;
        this.section = section;
        this.pubDate = pubDate;
        this.currentReader = currentReader;
        this.borrowedOn = borrowedOn;
    }

    public getIsbn (): String {
        return this.isbn;
    }

    public setIsbn (isbn: String): void {
        this.isbn = isbn;
    }

    public getTitle (): String {
        return this.title;
    }

    public setTitle (title: String): void {
        this.title = title;
    }


    public getSection (): String {
        return this.section;
    }

    public setSection (section: String): void {
        this.section = section;
    }

    public getPubDate (): Date {
        return this.pubDate;
    }

    public setPubDate (pubDate: Date): void {
        this.pubDate = pubDate;
    }

    public getCurrentReader (): Reader {
        return this.currentReader;
    }

    public setCurrentReader (currentReader: Reader): void {
        this.currentReader = currentReader;
    }

    public getBorrowedOn (): Date {
        return this.borrowedOn;
    }

    public setBorrowedOn (borrowedOn: Date): void {
        this.borrowedOn = borrowedOn;
    }

}
