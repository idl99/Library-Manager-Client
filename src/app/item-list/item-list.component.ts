import { Component, OnInit, Inject } from '@angular/core';
import { Book } from '../shared/models/Book';
import { MatDialog, MatTableDataSource, } from '@angular/material';
import { AddItemDialogComponent } from '../forms/add-item-dialog/add-item-dialog.component';
import { LibraryService } from '../shared/services/library.service';
import { LibraryItem } from '../shared/models/LibraryItem';
import { Dvd } from '../shared/models/Dvd';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {

  // private dataSource: LibraryItemDataSource;
  private dataSource: MatTableDataSource<LibraryItem>;
  private columnsToDisplay: String[]; // columns to display in Item List Data Table

  constructor(public dialog: MatDialog, private libraryService: LibraryService ) {
    // this.dataSource = new LibraryItemDataSource(libraryService);
    this.dataSource = new MatTableDataSource();
    this.initializeDatasource();
    this.columnsToDisplay = ['Availability', 'Type', 'ISBN', 'title', 'section', 'actionBtns'];
  }

  public initializeDatasource(): void {
    this.libraryService.getAllItems().subscribe((data) => {
      this.dataSource.data = data as LibraryItem[];
    });
  }

  private isAvailable(item: LibraryItem): boolean {
    return item.getCurrentReader() === null ? true : false;
  }

  private isBook(item: LibraryItem): boolean {
    // console.log(item);
    return item instanceof Book;
  }

  private isDvd(item: LibraryItem): boolean {
    // console.log(item);
    return item instanceof Dvd;
  }

  public applyFilter(filterString: String): void {
    this.dataSource.filter = filterString.trim().toLowerCase();
  }

  // method invoked to open Add Item Dialog
  private onAddItem(choice: String): void {
    this.dialog.open(AddItemDialogComponent, {
      width: '600px',
      data: {
        itemType: choice
      }
    });
    this.dialog._afterAllClosed.subscribe(() => this.initializeDatasource()
    );
  }

  private onDelete(item: LibraryItem): void {
    let observable: Observable<String>;
    if (item instanceof Book) {
      observable = this.libraryService.deleteBook(item.getIsbn());
    } else if (item instanceof Dvd) {
      observable = this.libraryService.deleteDvd(item.getIsbn());
    }
    observable.subscribe(
      success => {
        this.initializeDatasource();
        alert('DELETE library/book successful');
        console.log(success);
      },
      err => {
        alert('DELETE library/book unsuccessful');
        console.log(err);
      }
    );
  }

  // method to open Borrow Item Dialog
  private onBorrow(libraryItem: LibraryItem): void {
    const readerId: String = window.prompt('Enter Reader Id: ');
    if (readerId === null) {
      return;
    }
    this.libraryService.borrowItem(libraryItem, readerId, new Date(Date.now()).toLocaleDateString('en-gb')).subscribe(
      success => {
        this.initializeDatasource();
        alert('Successfully borrowed item');
      },
      error => alert('Failed to borrow item')
    );
  }

  private onReturn(libraryItem: LibraryItem): void {
    this.libraryService.returnItem(libraryItem).subscribe(
      success => {
        this.initializeDatasource();
        alert('Successfully returned book. Due fee is $' + success);
      },
      error => {
        console.log(error);
        alert('Failed to return book');
      }
    );
  }

  private getToolTip(item: LibraryItem): String {
    if (this.isAvailable(item)) {
      return 'Item is available to be borrowed';
    } else {
      if (item instanceof Book) {
        return 'Book is currently borrowed. Will be available again soon';
      } else if (item instanceof Dvd) {
        return 'Dvd is currently borrowed. Will be available again soon';
      }
    }
  }

}
