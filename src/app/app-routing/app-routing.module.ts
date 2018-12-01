import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route} from '@angular/router';
import { ItemListComponent } from '../item-list/item-list.component';
import { ReportComponent } from '../report/report.component';

const appRoutes: Route[] = [
  {path: 'itemList', component: ItemListComponent},
  {path: 'report', component: ReportComponent},
  {path: '', redirectTo: '/itemList', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
