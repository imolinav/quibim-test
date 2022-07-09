import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/models/api/api.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  history!: History;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTodayHistory().subscribe({
      next: (n) => this.history = n
    })
  }

}
