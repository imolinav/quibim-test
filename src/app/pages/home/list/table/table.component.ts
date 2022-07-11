import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryData } from 'src/app/models/api/api.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() events!: HistoryData[];
  @Output() eventSelected = new EventEmitter<HistoryData>();

  constructor() { }

  ngOnInit(): void {
  }

  selectEvent(event: HistoryData) {
    this.eventSelected.emit(event);
  }

}
