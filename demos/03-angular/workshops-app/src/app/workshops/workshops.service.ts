import { Injectable } from '@angular/core';
import IWorkshop from './models/IWorkshop';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkshopsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWorkshops(page: number = 1, category: string = '') {
    // URLSearchParams() to construct the search params to send to the backend
    const params: { _page: number; category?: string } = {
      _page: page,
    };

    if (category !== '') {
      params.category = category;
    }

    return this.http.get<IWorkshop[]>(`${this.apiUrl}/workshops/`, {
      // params: params
      params,
    });
    // .pipe(
    //   map( workshops => )
    // )

    // like Promise.all(), Promise.allSettled()...
    // switchMap(), forkJoin()
  }

  getWorkshopById(workshopId: number) {
    return this.http.get<IWorkshop>(`${this.apiUrl}/workshops/${workshopId}`);
  }

  deleteWorkshopById(workshopId: number) {
    return this.http.delete<void>(`${this.apiUrl}/workshops/${workshopId}`);
  }
}
