import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PrimeNgModule } from './primeng';

import { ListExpenseComponent } from './list-expense/list-expense.component';
import { ChartsComponent } from './charts/charts.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/expenses', pathMatch: 'full' },
  { path: 'expenses', component: ListExpenseComponent },
  { path: 'charts', component: ChartsComponent },
  { path: '**', redirectTo: 'expenses' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListExpenseComponent,
    ChartsComponent,
    TabMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    PrimeNgModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
