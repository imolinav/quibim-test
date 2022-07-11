import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { History, HistoryData } from 'src/app/models/api/api.model';
import { ApiService } from 'src/app/services/api/api.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ListType } from './list/models/list.model';
import { ModalComponent } from './modal/modal.component';

type FilteredTypes = { births: boolean, deaths: boolean, events: boolean };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  displayedEvents!: HistoryData[];
  allEvents!: HistoryData[];
  pageIndex = 1;
  pageCount!: number;
  loading: boolean = true;
  listType: ListType = 'table';
  pageTitle!: string;

  constructor(private apiService: ApiService, private loader: LoaderService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loader.show();
    this.apiService.getTodayHistory().subscribe({
      next: (n) => {
        this.pageTitle = n.date;
        this.allEvents = [...n.data.Events, ...n.data.Births, ...n.data.Deaths];
        this.getEventsByPage();
        this.loading = false;
        this.loader.hide();
      }
    });
  }

  changeDisplay(displayType: ListType) {
    this.listType = displayType;
  }

  filterEvents(filterGroup: FormGroup) {
    this.loader.show();
    const dateType = filterGroup.get('dateType')?.value;
    const date = new Date(filterGroup.get('date')?.value);
    const filteredTypes = filterGroup.get('type')?.value;

    if(dateType === '1' || dateType === '2' || dateType === '4') {
      this.apiService.getTodayHistory().subscribe({
        next: (n) => {
          this.pageTitle = n.date;
          this.newEventHistory(n, filteredTypes, dateType, date.getFullYear());
          this.loader.hide();
        }
      });
    } else {
      const today = new Date();
      const dayFrom = new Date(filterGroup.get('date')?.value[0]);
      const dayTo = new Date(filterGroup.get('date')?.value[1]);

      let eventsHistory$: Observable<History>[] = [];
      for(let i = dayFrom.getDate(); i <= dayTo.getDate(); i++) {
        eventsHistory$.push(this.apiService.getHistoryByDate(today.getMonth() + 1, i))
      }
      forkJoin(eventsHistory$).subscribe({
        next: (n) => {
          this.pageTitle = n[0].date + ' - ' + n[n.length - 1].date;
          this.newMultiEventsHistory(n, filteredTypes);
          this.loader.hide();
        }
      });
    }
  }

  newEventHistory(history: History, type: FilteredTypes, dateType: string, year: number) {
    this.allEvents = [];
    if(type.births) {
      this.allEvents.push(...history.data.Births);
    }
    if(type.deaths) {
      this.allEvents.push(...history.data.Deaths);
    }
    if(type.events) {
      this.allEvents.push(...history.data.Events);
    }

    if(dateType === '1') {
      this.allEvents = this.allEvents.filter(event => Number(event.year) <= year);
    }
    if(dateType === '4') {
      this.allEvents = this.allEvents.filter(event => Number(event.year) >= year);
    }
    this.getEventsByPage();
  }

  newMultiEventsHistory(history: History[], type: FilteredTypes) {
    this.allEvents = [];
    for(let day of history) {
      if(type.births) {
        this.allEvents.push(...day.data.Births);
      }
      if(type.deaths) {
        this.allEvents.push(...day.data.Deaths);
      }
      if(type.events) {
        this.allEvents.push(...day.data.Events);
      }
    }
    this.getEventsByPage();
  }

  getEventsByPage() {
    this.allEvents.sort((a, b) => (Number(a.year) > Number(b.year) ? 1 : -1));
    this.displayedEvents =  this.allEvents.slice(10*(this.pageIndex - 1), (10*this.pageIndex));
    this.pageCount = Math.ceil(this.allEvents.length / 10);
  }

  nextPageSelected() {
    this.pageIndex++;
    this.getEventsByPage();
  }
  
  previousPageSelected() {
    this.pageIndex--;
    this.getEventsByPage();
  }

  pageSelected(page: number) {
    this.pageIndex = page;
    this.getEventsByPage();
  }

  handleEventSelected(event: HistoryData) {
    this.dialog.open(ModalComponent, { data: event });
  }

}
