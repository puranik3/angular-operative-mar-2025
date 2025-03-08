import { Injectable } from '@angular/core';
import IWorkshop from './models/IWorkshop';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkshopsService {
  constructor(private http: HttpClient) {}

  getWorkshops(page: number = 1) {
    return this.http.get<IWorkshop[]>(
      `https://workshops-server.onrender.com/workshops/`,
      {
        params: {
          _page: page,
        },
      }
    );
    // .pipe(
    //   map( workshops => )
    // )

    // like Promise.all(), Promise.allSettled()...
    // switchMap(), forkJoin()
  }
}
