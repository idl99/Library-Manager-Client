import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ItemListComponent } from '../item-list/item-list.component';
import { ReportComponent } from '../report/report.component';
import { LoginComponent } from '../login/login.component';
import { AppNavigationComponent } from '../app-navigation/app-navigation.component';
import { LoginAuthGuard } from '../auth/login-auth.guard';

/**
 * APP ROUTING MODULE
 * This user defined module handles Single Page Routing for our Angular application.
 * Included in the main AppModule.
 */

const appRoutes: Route[] = [
  { path: 'library', canActivate: [LoginAuthGuard], component: AppNavigationComponent, children: [
    { path: 'item-list', component: ItemListComponent },
    { path: 'report', component: ReportComponent },
    { path: '', redirectTo: 'item-list', pathMatch: 'full' }
  ]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'library/item-list', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
