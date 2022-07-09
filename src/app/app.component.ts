import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'quibim-test';

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.apiService.getTodayHistory().subscribe(res => {
      console.log(res);
    })
  }
}
