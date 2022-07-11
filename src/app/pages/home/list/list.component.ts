import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() eventSelected = new EventEmitter<HistoryData>();

  constructor() { }

  ngOnInit(): void {
  }

  returnEvent(event: HistoryData) {
    this.eventSelected.emit(event);
  }

}
