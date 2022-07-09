import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from 'src/app/models/api/api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getTodayHistory(): Observable<History> {
    return this.httpClient.get<History>(`${environment.apiUrl}/date`);
  }

  getHistoryByDate(month: number, day: number): Observable<History> {
    return this.httpClient.get<History>(`${environment.apiUrl}/date/${month}/${day}`);
  }
}
