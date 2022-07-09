import { Component, OnInit } from '@angular/core';
import { History, HistoryData } from 'src/app/models/api/api.model';
import { ApiService } from 'src/app/services/api/api.service';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTodayHistory().subscribe({
      next: (n) => {
        this.history = n;
        this.allEvents = [...n.data.Events, ...n.data.Births, ...n.data.Deaths];
        this.allEvents.sort((a, b) => (Number(a.year) > Number(b.year) ? 1 : -1));
        this.getEventsByPage();
        this.pageCount = Math.ceil(this.allEvents.length / 10);
        this.loading = false;
      }
    });
  }

  getEventsByPage() {
    this.displayedEvents =  this.allEvents.slice(10*(this.pageIndex - 1), (10*this.pageIndex) - 1);
    console.log(this.displayedEvents);
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
