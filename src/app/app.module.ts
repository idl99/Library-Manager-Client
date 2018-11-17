import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule,
  MatTableModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatOptionModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatExpansionModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemListComponent } from './item-list/item-list.component';
import { SearchItemComponent } from './search-item/search-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { AddItemDialogComponent } from './forms/add-item-dialog/add-item-dialog.component';
import { ItemListService } from './shared/services/item-list.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    ItemListComponent,
    SearchItemComponent,
    ActionButtonsComponent,
    AddItemDialogComponent
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
    MatExpansionModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    ItemListService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // dynamically created components
    AddItemDialogComponent
  ]
})
export class AppModule { }
