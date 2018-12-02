import { Reader } from './Reader';

export abstract class LibraryItem {

    protected isbn: String;
    protected title: String;
    protected section: String;
    protected pubDate: String;
    protected currentReader: Reader;
    protected borrowedOn: String;

    constructor(isbn: String, title: String, section: String,
                    pubDate: String, currentReader: Reader, borrowedOn: String) {
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

    public getPubDate (): String {
        return this.pubDate;
    }

    public setPubDate (pubDate: String): void {
        this.pubDate = pubDate;
    }

    public getCurrentReader (): Reader {
        return this.currentReader;
    }

    public setCurrentReader (currentReader: Reader): void {
        this.currentReader = currentReader;
    }

    public getBorrowedOn (): String {
        return this.borrowedOn;
    }

    public setBorrowedOn (borrowedOn: String): void {
        this.borrowedOn = borrowedOn;
    }

}
