import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListType } from '../list/models/list.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() displayType!: ListType;
  @Output() eventsFiltered = new EventEmitter<FormGroup>();
  @Output() displayTypeChanged = new EventEmitter<ListType>();

  filterForm!: FormGroup;
  dateType!: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      type: this.formBuilder.group({
        events: [true],
        births: [true],
        deaths: [true]
      }),
      dateType: ['2'],
      date: ['']
    });

    this.filterForm.get('type')?.valueChanges.subscribe(formType => {
      this.eventsFiltered.emit(this.filterForm);
    });

    this.filterForm.get('dateType')?.valueChanges.subscribe(formDateType => {
      switch(formDateType) {
        case '1':
        case '4':
          this.filterForm.get('date')?.setValue('');
          this.dateType = 'year';
          break;
        case '2':
          this.dateType = '';
          this.eventsFiltered.emit(this.filterForm);
          break;
        case '3':
          this.filterForm.get('date')?.setValue('');
          this.dateType = 'range';
      }
    });

    this.filterForm.get('date')?.valueChanges.subscribe(formDate => {
      if(formDate !== '') {
        this.eventsFiltered.emit(this.filterForm);
      }
    })
  }

  changeDisplay() {
    this.displayTypeChanged.emit(this.displayType);
  }

}
