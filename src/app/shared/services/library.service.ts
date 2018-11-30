import { Injectable } from '@angular/core';
import { LibraryItem } from '../models/LibraryItem';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/Book';
import { Observable, forkJoin } from 'rxjs';
import { Dvd } from '../models/Dvd';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private httpService: HttpClient) {
  }

  getAllItems(): Observable<LibraryItem[]> {
    return forkJoin(this.getAllBooks(), this.getAllDvd()).pipe(
      map((data) => {
        let array: LibraryItem[] = [];
        array = array.concat(data[0]).concat(data[1]);
        return array;
      })
    );
  }

  getAllBooks(): Observable<Book[]> {
    return this.httpService.get<Book[]>('http://localhost:9000/library/books').pipe(
      map((response) => {
        const aryOfBooks: Array<Book> = [];
        response.forEach(element => aryOfBooks.push(Book.fromObject(element)));
        return aryOfBooks;
      })
    );
  }

  getAllDvd(): Observable<Dvd[]> {
    return this.httpService.get<Dvd[]>('http://localhost:9000/library/dvd').pipe(
      map((response) => {
        const aryOfDvd: Array<Dvd> = [];
        response.forEach(element => {
          aryOfDvd.push(Dvd.fromObject(element));
        });
        return aryOfDvd;
      })
    );
  }

  postBook(book: Book): void {
    this.httpService.post<Book>('http://localhost:9000/library/books', book).subscribe(
      success => {
        alert('POST library/book successful');
        console.log(success);
      },
      err => {
        alert('POST library/book unsuccessful');
        console.log(err);
      }
    );
  }

  postDvd(dvd: Dvd): void {
    this.httpService.post<Dvd>('http://localhost:9000/library/dvd', dvd).subscribe(
      success => {
        alert('POST library/dvd successful');
        console.log(success);
      },
      err => {
        alert('POST library/dvd unsuccessful');
        console.log(err);
      }
    );
  }

  deleteBook(isbn: String): void {
    this.httpService.delete<String>('http://localhost:9000/library/books/' + isbn).subscribe(
      success => {
        alert('DELETE library/book successful');
        console.log(success);
      },
      err => {
        alert('DELETE library/book unsuccessful');
        console.log(err);
      }
    );
  }

  deleteDvd(isbn: String): void {
    this.httpService.delete<String>('http://localhost:9000/library/dvd/' + isbn).subscribe(
      success => {
        alert('DELETE library/dvd successful');
        console.log(success);
      },
      err => {
        alert('DELETE library/dvd unsuccessful');
        console.log(err);
      }
    );
  }


}
