import { Component } from '@angular/core';
import { Book } from '../shared/models/Book';
import { MatDialog, } from '@angular/material';
import { AddItemDialogComponent } from '../forms/add-item-dialog/add-item-dialog.component';
import { ItemListService } from '../shared/services/item-list.service';
import { LibraryItem } from '../shared/models/LibraryItem';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {

  columnsToDisplay: String[] = ['ISBN', 'title', 'section', 'actionBtns']; // columns to display in Item List Data Table

  data: LibraryItem[]; // ItemList data to be displayed on table
                      // obtained using instance of ItemListService

  constructor(public dialog: MatDialog, private itemListService: ItemListService) {
    this.data = itemListService.getAllItems();
  }

  // method invoked to open Add Item Dialog
  onClick(choice: String): void {

    this.dialog.open(AddItemDialogComponent, {
      width: '600px',
      data: {
        itemType: choice
      }
    });
  }

}
