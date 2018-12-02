import { Reader } from './Reader';
import { LibraryItem } from './LibraryItem';
import { Injectable } from '@angular/core';
import { assign } from 'lodash';

@Injectable()
export class Book extends LibraryItem {

    private authors: String[];
    private publisher: String;
    private noOfPages: Number;

    constructor(ISBN: String, title: String, section: String, pubDate: String,
                    currentReader: Reader, borrowedOn: String, authors: String[], publisher: String, noOfPages: Number) {
        super(ISBN, title, section, pubDate, currentReader, borrowedOn);
        this.authors = authors;
        this.publisher = publisher;
        this.noOfPages = noOfPages;
    }

    static fromObject(object: Object): Book {
        return assign(new this(null, null, null, null, null, null, null, null, null), object);
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
