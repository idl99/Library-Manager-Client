import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  displayedColumns: string[] = ['isbn', 'title', 'borrowedOn', 'overdueBy', 'fee'];
  dataSource = [];

  constructor() { }

}
