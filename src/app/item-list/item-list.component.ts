import { Component, OnInit, Inject } from '@angular/core';
import { Book } from '../shared/models/Book';
import { MatDialog, MatTableDataSource, } from '@angular/material';
import { AddItemDialogComponent } from '../forms/add-item-dialog/add-item-dialog.component';
import { LibraryService } from '../shared/services/library.service';
import { LibraryItem } from '../shared/models/LibraryItem';
import { Dvd } from '../shared/models/Dvd';

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
    libraryService.getAllItems().subscribe((data) => {
      this.dataSource.data = data as LibraryItem[];
    });
    this.columnsToDisplay = ['Availability', 'Type', 'ISBN', 'title', 'section', 'actionBtns'];
  }

  private isAvailable(item: LibraryItem): boolean {
    return item.getCurrentReader() === null ? true : false;
  }

  private isBook(item: LibraryItem): boolean {
    console.log(item);
    return item instanceof Book;
  }

  private isDvd(item: LibraryItem): boolean {
    // console.log(item);
    return item instanceof Dvd;
  }

  private onDelete(item: LibraryItem): void {
    if (item instanceof Book) {
      this.libraryService.deleteBook(item.getIsbn());
    } else if (item instanceof Dvd) {
      this.libraryService.deleteDvd(item.getIsbn());
    }
  }

  public applyFilter(filterString: String): void {
    this.dataSource.filter = filterString.trim().toLowerCase();
  }

  // method invoked to open Add Item Dialog
  onAddItem(choice: String): void {
    this.dialog.open(AddItemDialogComponent, {
      width: '600px',
      data: {
        itemType: choice
      }
    });
  }

}

// export class LibraryItemDataSource extends DataSource<LibraryItem> {

//   constructor(private libraryService: LibraryService) {
//     super();
//   }

//   connect(): Observable<LibraryItem[]> {
//     return this.libraryService.getAllItems();
//   }

//   disconnect(): void {
//   }


// }
