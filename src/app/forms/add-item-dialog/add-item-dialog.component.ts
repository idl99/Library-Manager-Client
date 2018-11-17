import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})

export class AddItemDialogComponent {

  itemType: String;
  addItemForm: FormGroup;
  isFormValid: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FormBuilder, public dialogRef: MatDialogRef<AddItemDialogComponent>) {

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
      } else if (this.itemType === 'DVD') {
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
    alert('Successfully added item to database');
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
