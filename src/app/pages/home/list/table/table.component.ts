import { Component, Input, OnInit } from '@angular/core';
import { HistoryData } from 'src/app/models/api/api.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() events!: HistoryData[];

  constructor() { }

  ngOnInit(): void {
  }

}
