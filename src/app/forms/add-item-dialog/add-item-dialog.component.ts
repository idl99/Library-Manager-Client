import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LibraryService } from '../../shared/services/library.service';
import { Book } from '../../shared/models/Book';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dvd } from '../../shared/models/Dvd';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})

export class AddItemDialogComponent {

  itemType: String;
  addItemForm: FormGroup;
  isFormValid: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
                  public dialogRef: MatDialogRef<AddItemDialogComponent>, private libraryService: LibraryService ) {

      this.itemType = data.itemType;

      this.addItemForm = this.fb.group({
        itemDetails: this.fb.group({
          isbn: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
          title: [null, [Validators.required]],
          section: [null, [Validators.required]],
          pubDate: [null]
        })
      });

      if (this.itemType === 'Book') {
        // Add Book form
        this.addItemForm.addControl('bookDetails', this.fb.group({
          authors: [null],
          publisher: [null],
          noOfPages: [null]
        }));
      } else if (this.itemType === 'Dvd') {
        // Add DVD form
        this.addItemForm.addControl('dvdDetails', this.fb.group({
          audio: [null],
          subtitles: [null],
          producer: [null],
          actors: [null]
        }));
      }

  } // end of constructor

  onOk(): void {
    // TODO implement POST to server here
    alert('To post Item');
    of(this.addItemForm.value).pipe(
      map((formGroup: Object) => {
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
          const book: Book = Book.fromObject(obj);
          this.libraryService.postBook(book);
        } else if (this.itemType === 'Dvd') {
          // Implement DVD post
          const dvd: Dvd = Dvd.fromObject(obj);
          console.log(dvd);
          this.libraryService.postDvd(dvd);
        }
      })
    ).subscribe(response => console.log(response));
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
