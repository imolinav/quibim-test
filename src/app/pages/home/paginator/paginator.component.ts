import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() pageCount!: number;
  @Input() pageIndex!: number;
  @Output() nextPage = new EventEmitter();
  @Output() previousPage = new EventEmitter();
  @Output() selectPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  handleSelectPage(pageSelected: number) {
    this.selectPage.emit(pageSelected);
  }

  handleNextPage() {
    this.nextPage.emit();
  }

  handlePreviousPage() {
    this.previousPage.emit();
  }

}
