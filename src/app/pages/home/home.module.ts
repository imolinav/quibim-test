import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './list/card/card.component';


@NgModule({
  declarations: [
    HomeComponent,
    PaginatorComponent,
    ListComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
