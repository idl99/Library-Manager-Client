import { Reader } from './Reader';
import { LibraryItem } from './LibraryItem';

export class Book extends LibraryItem {

    protected authors: String[];
    protected publisher: String;
    protected noOfPages: Number;

    constructor(ISBN: String, title: String, section: String, pubDate: Date,
                    currentReader: Reader, borrowedOn: Date, authors: String[], publisher: String, noOfPages: Number) {
        super(ISBN, title, section, pubDate, currentReader, borrowedOn);
        this.authors = authors;
        this.publisher = publisher;
        this.noOfPages = noOfPages;
    }

    public getAuthors(): String[] {
        return this.authors;
    }

    public setAuthors(authors: String[]): void {
        this.authors = authors;
    }

    public getPublisher(): String {
        return this.publisher;
    }

    public setPublisher(publisher: String): void {
        this.publisher = publisher;
    }

    public getNoOfPages(): Number {
        return this.noOfPages;
    }

    public setNoOfPages(authors: String[]): void {
        this.authors = authors;
    }

}
