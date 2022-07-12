import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {

  @Input() eventType!: string;

  @HostBinding('class') get chipClass(): string {
    return `chip-${this.eventType}`;
  }

  constructor() { }


}
