import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {ChartModule} from 'primeng/chart';
import {TabMenuModule} from 'primeng/tabmenu';

@NgModule({
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ChartModule,
    TabMenuModule,
  ],
  exports: [
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ChartModule,
    TabMenuModule,
  ],
})
export class PrimeNgModule { }
