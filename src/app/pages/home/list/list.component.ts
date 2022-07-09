import { Component, Input, OnInit } from '@angular/core';
import { HistoryData } from 'src/app/models/api/api.model';
import { ListType } from './models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() listType!: ListType;
  @Input() events!: HistoryData[];

  constructor() { }

  ngOnInit(): void {
  }

}
