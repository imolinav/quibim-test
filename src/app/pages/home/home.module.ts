import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './list/card/card.component';
import { TableComponent } from './list/table/table.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    HomeComponent,
    PaginatorComponent,
    ListComponent,
    CardComponent,
    TableComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzDatePickerModule,
    NzIconModule
  ]
})
export class HomeModule { }
