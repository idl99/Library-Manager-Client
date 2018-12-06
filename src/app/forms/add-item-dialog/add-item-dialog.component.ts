import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent} from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LibraryService } from '../../shared/services/library.service';
import { Book } from '../../shared/models/Book';
import { Observable } from 'rxjs';
import { Dvd } from '../../shared/models/Dvd';
import { LibraryItem } from '../../shared/models/LibraryItem';


@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})

export class AddItemDialogComponent implements OnInit {

  itemType: String;
  addItemForm: FormGroup;
  isFormValid: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddItemDialogComponent>,
                 private fb: FormBuilder, private libraryService: LibraryService) {
    this.itemType = data.itemType;
  } // end of constructor

  ngOnInit(): void {

      this.addItemForm = this.fb.group({
        itemDetails: this.fb.group({
          isbn: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]], title: [null, [Validators.required]],
          section: [null, [Validators.required]], pubDate: [new Date().toLocaleDateString('en-gb')]})
      });

      if (this.itemType === 'Book') {
        // Add Book form
        this.addItemForm.addControl('bookDetails', this.fb.group({authors: [null], publisher: [null], noOfPages: [null]}));
      } else if (this.itemType === 'Dvd') {
        // Add DVD form
        this.addItemForm.addControl('dvdDetails', this.fb.group({ audio: [null], subtitles: [null],producer: [null], actors: [null]}));
      }

  }

  private onAddItem(): void {

    const toPostItem: LibraryItem = this.getFormInput(this.addItemForm.value);
    let observable: Observable<LibraryItem>;

    if (toPostItem instanceof Book) {
      observable = this.libraryService.postBook(toPostItem);
    } else if (toPostItem instanceof Dvd) {
      observable = this.libraryService.postDvd(toPostItem);
    }

    observable.subscribe(
      success => alert(success),
      err => alert(err),
      () => this.dialogRef.close('Ok')
    );

  }

  private updateDate(event: MatDatepickerInputEvent<Date>): void {
    this.addItemForm.controls.itemDetails.get('pubDate').setValue(event.value.toLocaleDateString('en-gb'));
  }

  private getFormInput(formGroup: Object): LibraryItem {

    const obj: Object = {};

    for (const nestedFormGroup in formGroup) {
      if (formGroup.hasOwnProperty(nestedFormGroup)) {
        const element = formGroup[nestedFormGroup];
        for (const prop in element) {
          if (element.hasOwnProperty(prop)) {
            obj[prop] = element[prop];
          }
        }
      }
    }

    if (this.itemType === 'Book') {
      return Book.fromObject(obj);
    } else if (this.itemType === 'Dvd') {
      return Dvd.fromObject(obj);
    }

  }

}
