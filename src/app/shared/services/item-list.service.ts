import { Injectable } from '@angular/core';
import { LibraryItem } from '../models/LibraryItem';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {

  // Class for ItemList Service - this service oversees of loading data from the server.
  // Single instance of ItemListService is injected to AppModule

  constructor() { }

  getAllItems(): LibraryItem[] {
    // GET requested to be implemented here
    return [
      new Book('9781408855713', 'Harry Potter and the Deathly Hallows', 'Fiction', null, null, null, String['JK Rowling'], 'Puffin', 650),
      new Book('9788493037741', 'Don Quixote', 'Novel', null, null, null, String['Miguel De Cervantes'], 'Penguin', 800),
      new Book('9780525639299', 'The Reckoning', 'Legal Thriller', null, null, null, String['John Grisham'], 'DOUBLEDAY', 800)
    ];
  }

}
