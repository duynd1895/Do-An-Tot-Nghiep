import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DVKT } from '../../../models/dvkt';

@Injectable({
  providedIn: 'root'
})
export class DvktService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getAllDVKT(): Observable<DVKT[]> {
    // const queryString = `?pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return this.http.get<DVKT[]>(this.API_URL + 'api/dmDVKT');
  }

  getDVKTById(id: string): Observable<DVKT> {
    return this.http.get<DVKT>(this.API_URL + `api/dmDVKT/${id}`);
  }

  createDVKT(body: DVKT): Observable<DVKT> {
    return this.http.post<DVKT>(this.API_URL + 'api/dmDVKT/create',  body);
  }

  updateDVKT(id: string,  body: DVKT): Observable<DVKT> {
    return this.http.put<DVKT>(this.API_URL + `api/dmDVKT/${id}`,  body);
  }

  deleteDVKTById(id: string): Observable<DVKT> {
    return this.http.delete<DVKT>(this.API_URL + `api/dmDVKT/${id}`);
  }
}
