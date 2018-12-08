import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule,
         MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule, MatTableModule, MatDialogModule,
         MAT_DIALOG_DEFAULT_OPTIONS, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
         MatExpansionModule, MAT_DATE_LOCALE, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemListComponent } from './item-list/item-list.component';
import { SearchItemComponent } from './search-item/search-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddItemDialogComponent } from './forms/add-item-dialog/add-item-dialog.component';
import { LibraryService } from './shared/services/library.service';
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './report/report.component';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    ItemListComponent,
    SearchItemComponent,
    AddItemDialogComponent,
    ReportComponent,
    ProgressSpinnerDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    HttpClientModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    LoginService,
    LibraryService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // dynamically created components
    AddItemDialogComponent,
    ProgressSpinnerDialogComponent
  ]
})
export class AppModule { }
