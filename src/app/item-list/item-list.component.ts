import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Book } from '../shared/models/Book';
import { MatDialog, MatTableDataSource, MatDialogRef } from '@angular/material';
import { AddItemDialogComponent } from '../forms/add-item-dialog/add-item-dialog.component';
import { LibraryService } from '../shared/services/library.service';
import { LibraryItem } from '../shared/models/LibraryItem';
import { Dvd } from '../shared/models/Dvd';
import { Observable } from 'rxjs';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  dataSource: MatTableDataSource<LibraryItem>;
  columnsToDisplay: String[] = ['availability', 'type', 'ISBN', 'title', 'section', 'actionBtns', 'availableOn'];
  progressSpinnerDialogRef: MatDialogRef<ProgressSpinnerDialogComponent, any>;

  constructor(public dialog: MatDialog, private libraryService: LibraryService ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    // Setting timeout to allow enough time to show animation
    setTimeout(() => {
      this.startProgressSpinner('Getting Items', 'Please wait while we fetch the Item List.');
      setTimeout( () => {
        this.libraryService.getAllItems().subscribe(
          (response) => {
            this.dataSource.data = response as LibraryItem[];
          },
          (err) => {
            alert(err);
          },
          () => {
            this.finishProgressSpinner();
        });
      }, 2500);
    });

  }

  applyFilter(filterString: String): void {
    this.dataSource.filter = filterString.trim().toLowerCase();
  }


  isBook(item: LibraryItem): boolean {
    return item instanceof Book;
  }


  isDvd(item: LibraryItem): boolean {
    return item instanceof Dvd;
  }


  isAvailable(item: LibraryItem): boolean {
    return item.getCurrentReader() === null ? true : false;
  }


  getAvailableOn(item: LibraryItem): String {

    if (this.isAvailable(item)) {
      return 'Available Now';
    } else {

      const day: number = parseInt(item.getBorrowedOn()['day'], null);
      const month: number = parseInt(item.getBorrowedOn()['month'], null);
      const year: number = parseInt(item.getBorrowedOn()['year'], null);
      const date: Date = new Date(year, month - 1, day);

      if (item instanceof Book) {
        date.setDate(date.getDate() + 7);
        return date.toLocaleDateString('en-gb');
      } else if (item instanceof Dvd) {
        date.setDate(date.getDate() + 3);
        return date.toLocaleDateString('en-gb');
      }

    }

  }


  // method invoked to open Add Item Dialog
  onAddItem(choice: String): void {
    const addItemDialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '600px',
      data: {
        itemType: choice
      }
    });
    addItemDialogRef.afterClosed().subscribe(
      (response) => {
        if (response === 'Ok') {
          this.ngOnInit();
        }
      }
    );
  }


  onDelete(item: LibraryItem): void {

    let observable: Observable<String>;

    if (item instanceof Book) {
      observable = this.libraryService.deleteBook(item.getIsbn());
    } else if (item instanceof Dvd) {
      observable = this.libraryService.deleteDvd(item.getIsbn());
    }

    this.startProgressSpinner('Deleting Item', 'Please wait while we delete this item from the database.');

    setTimeout( () => {
      observable.subscribe(
        (success) => {
          this.finishProgressSpinner();
          this.ngOnInit();
          alert(success);
        },
        (err) => {
          this.finishProgressSpinner();
          alert(err);
        });
    }, 2500);

  }


  onBorrow(libraryItem: LibraryItem): void {

    const readerId: String = window.prompt('Enter Reader Id: ');
    if (readerId === null) {
      return;
    }

    this.startProgressSpinner('Borrowing Item', 'Please wait while we process your Item Borrowal.');

    setTimeout(() => {
      this.libraryService.borrowItem(libraryItem, readerId, new Date(Date.now()).toLocaleDateString('en-gb')).subscribe(
        success => {
          this.progressSpinnerDialogRef.close();
          this.ngOnInit();
          alert(success);
        },
        err => {
          alert(err);
        }
      );
    }, 2500);

  }


  onReturn(libraryItem: LibraryItem): void {

    this.startProgressSpinner('Returning Item', 'Please wait while we process this Item Return.');

    setTimeout(() => {
      this.libraryService.returnItem(libraryItem).subscribe(
        success => {
          this.finishProgressSpinner();
          this.ngOnInit();
          alert(success);
        },
        err => {
          this.finishProgressSpinner();
          alert(err);
        }
      );
    }, 2500);

  }


  onReserve(libraryItem: LibraryItem): void {

    const readerId = window.prompt('Enter Reader Id: ');

    if (readerId == null) {
      alert('Reader Id is required. Try again');
    } else {

      this.startProgressSpinner('Reserving Item', 'Please wait while we reserve this Item for you.');

      setTimeout(() => {
        this.libraryService.reserveItem(libraryItem, readerId).subscribe(
          success => {
            alert(success);
          },
          err => {
            alert(err);
          },
          () => {
            this.finishProgressSpinner();
          }
        );
      }, 2500);

    }
  }

  startProgressSpinner(title: String, message: String) {
    this.progressSpinnerDialogRef = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true,
      data: {
        title: title,
        message: message
      }
    });
  }

  finishProgressSpinner() {
    if (this.progressSpinnerDialogRef !== undefined) {
      this.progressSpinnerDialogRef.close();
    }
  }


}
