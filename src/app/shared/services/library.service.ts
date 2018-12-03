import { Injectable } from '@angular/core';
import { LibraryItem } from '../models/LibraryItem';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/Book';
import { Observable, forkJoin, of } from 'rxjs';
import { Dvd } from '../models/Dvd';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private httpService: HttpClient) {
  }

  getAllItems(): Observable<LibraryItem[]> {
    return forkJoin(this.getAllBooks(), this.getAllDvd()).pipe(
      map(data => {
        let array: LibraryItem[] = [];
        data.forEach(element => {
          if (element !== null) {
            array = array.concat(element);
          }
        });
        return array;
      }));
  }

  getAllBooks(): Observable<Book[]> {
    return this.httpService.get<Book[]>('http://localhost:9000/library/books').pipe(
      map((response) => {
        const aryOfBooks: Array<Book> = [];
        response.forEach(element => aryOfBooks.push(Book.fromObject(element)));
        return aryOfBooks;
      }),
      catchError((err) => {
        alert(err.error);
        return of(null);
      }));
  }

  getAllDvd(): Observable<Dvd[]> {
    return this.httpService.get<Dvd[]>('http://localhost:9000/library/dvd').pipe(
      map((response) => {
        const aryOfDvd: Array<Dvd> = [];
        response.forEach(element => {
          aryOfDvd.push(Dvd.fromObject(element));
        });
        return aryOfDvd;
      }),
      catchError((err) => {
        alert(err.error);
        return of(null);
      }));
  }

  postBook(book: Book): Observable<Book> {
    return this.httpService.post<Book>('http://localhost:9000/library/books', book);
  }

  postDvd(dvd: Dvd): Observable<Dvd> {
    return this.httpService.post<Dvd>('http://localhost:9000/library/dvd', dvd);
  }

  deleteBook(isbn: String): Observable<String> {
    return this.httpService.delete<String>('http://localhost:9000/library/books/' + isbn);
  }

  deleteDvd(isbn: String): Observable<String> {
    return this.httpService.delete<String>('http://localhost:9000/library/dvd/' + isbn);
  }

  borrowItem(item: LibraryItem, readerId: String, dateString: String): Observable<LibraryItem> {

    if (item instanceof Book) {
      return this.httpService.put<Book>('http://localhost:9000/library/borrow',
      {type: 'Book', isbn: item.getIsbn(), readerId: readerId, borrowedOn: dateString});
    } else if (item instanceof Dvd) {
      return this.httpService.put<Dvd>('http://localhost:9000/library/borrow',
      {type: 'Dvd', isbn: item.getIsbn(), readerId: readerId, borrowedOn: dateString});
    }

  }

  returnItem(item: LibraryItem): Observable<LibraryItem> {

    if (item instanceof Book) {
      // return this.httpService.put<Book>('http://localhost:9000/library/return',
      // {type: 'Book', isbn: item.getIsbn(), returnedOn: '10/12/2018'});
      return this.httpService.put<Book>('http://localhost:9000/library/return',
      {type: 'Book', isbn: item.getIsbn(), returnedOn: new Date(Date.now()).toLocaleDateString('en-gb')});
    } else if (item instanceof Dvd) {
      // return this.httpService.put<Dvd>('http://localhost:9000/library/return',
      // {type: 'Dvd', isbn: item.getIsbn(), returnedOn: '10/12/2018'});
      return this.httpService.put<Dvd>('http://localhost:9000/library/return',
      {type: 'Dvd', isbn: item.getIsbn(), returnedOn: new Date(Date.now()).toLocaleDateString('en-gb')});
    }

  }

  reserveItem(item: LibraryItem, readerId: String): Observable<any> {
    let type: String;
    if (item instanceof Book) {
      type = 'Book';
    } else if (item instanceof Dvd) {
      type = 'Dvd';
    }
    return this.httpService.put<any>('http://localhost:9000/library/reserve',
    {type: type, isbn: item.getIsbn(), readerId: readerId});
  }

  getReport(generatedOn: String): Observable<LibraryItem[]> {
    return this.httpService.get<LibraryItem[]>('http://localhost:9000/library/report?generatedOn=' + generatedOn);
  }


}
