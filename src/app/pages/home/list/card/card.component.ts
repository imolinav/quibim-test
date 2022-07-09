import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HistoryData } from 'src/app/models/api/api.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {

  @Input() event!: HistoryData;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.event);
  }

  getSanitizedHtml(htmlString: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

}
