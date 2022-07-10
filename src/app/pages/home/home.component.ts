import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin, Observable, filter } from 'rxjs';
import { History, HistoryData } from 'src/app/models/api/api.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ListType } from './list/models/list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  history!: History;
  displayedEvents!: HistoryData[];
  allEvents!: HistoryData[];
  pageIndex = 1;
  pageCount!: number;
  loading: boolean = true;
  listType: ListType = 'table';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTodayHistory().subscribe({
      next: (n) => {
        this.history = n;
        this.allEvents = [...n.data.Events, ...n.data.Births, ...n.data.Deaths];
        this.getEventsByPage();
        this.loading = false;
      }
    });
  }

  changeDisplay(displayType: ListType) {
    this.listType = displayType;
  }

  filterEvents(filterGroup: FormGroup) {
    const dateType = filterGroup.get('dateType')?.value;
    const date = new Date(filterGroup.get('date')?.value);
    if(dateType === '1' || dateType === '2' || dateType === '4') {
      this.apiService.getTodayHistory().subscribe({
        next: (n) => {
          this.history = n;
          this.newEventHistory(filterGroup.get('type')?.value, dateType, date.getFullYear());
        }
      });
    } else {
      const d = new Date();
      const month = d.getMonth();
      const dayFrom = filterGroup.get('date')?.value[0].split(' ')[2];
      const dayTo = filterGroup.get('date')?.value[1].split(' ')[2];
      let eventsHistory$: Observable<History>[] = [];
      for(let i = dayFrom; i <= dayTo; i++) {
        eventsHistory$.push(this.apiService.getHistoryByDate(month, i))
      }
      /* forkJoin(eventsHistory$).subscribe(res => {
        console.log(res);
      }); */
    }
    
  }

  newEventHistory(type: { births: boolean, deaths: boolean, events: boolean }, dateType: string, year: number) {
    this.allEvents = [];
    if(type.births) {
      this.allEvents.push(...this.history.data.Births);
    }
    if(type.deaths) {
      this.allEvents.push(...this.history.data.Deaths);
    }
    if(type.events) {
      this.allEvents.push(...this.history.data.Events);
    }

    if(dateType === '1') {
      this.allEvents = this.allEvents.filter(event => Number(event.year) <= year);
    }
    if(dateType === '4') {
      this.allEvents = this.allEvents.filter(event => Number(event.year) >= year);
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

}
