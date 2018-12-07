import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-progress-spinner-dialog',
  templateUrl: './progress-spinner-dialog.component.html',
  styleUrls: ['./progress-spinner-dialog.component.css']
})
export class ProgressSpinnerDialogComponent implements OnInit {

  title: String;
  message: String;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }



}
