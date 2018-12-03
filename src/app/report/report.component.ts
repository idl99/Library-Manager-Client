import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryService } from '../shared/services/library.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LibraryItem } from '../shared/models/LibraryItem';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  displayedColumns: string[] = ['isbn', 'title', 'borrowedOn', 'overdueBy', 'fee'];
  dataSource = new MatTableDataSource<LibraryItem>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private libraryService: LibraryService) {
    this.initializeDataSource();
  }

  private initializeDataSource(): void {
    this.libraryService.getReport(new Date(Date.now()).toLocaleDateString('en-gb')).subscribe(
      success => {
        this.dataSource.data = success['items'];
        this.dataSource.sort = this.sort;
      }
    );
  }

}
