import { Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HistoryData } from 'src/app/models/api/api.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }
  @Input() event!: HistoryData;
  @Output() eventSelected = new EventEmitter<HistoryData>();

  constructor(private sanitizer: DomSanitizer) { }

  getSanitizedHtml(htmlString: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  selectEvent(event: HistoryData) {
    this.eventSelected.emit(event);
  }

}
