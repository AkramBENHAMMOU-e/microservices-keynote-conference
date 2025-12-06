import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Keynote} from '../models/Keynote';

@Injectable({
  providedIn: 'root',
})
export class KeynotesService {
  private readonly baseUrl = 'http://localhost:8888';

  constructor(private http : HttpClient) {
  }

  public getAllKeynotes() : Observable<Array<any>>{
    return this.http.get<Array<Keynote>>(`${this.baseUrl}/keynote-service/api/keynotes`);
  }

  deleteKeynote(keynote: Keynote) {
    return this.http.delete<Keynote>(`${this.baseUrl}/keynote-service/api/keynotes/${keynote.id}`);
  }

  saveKeynote(keynote: Keynote) {
    return this.http.post<Keynote>(`${this.baseUrl}/keynote-service/api/keynotes`, keynote);
  }

  updateKeynote(keynote: Keynote, newKeynote: Keynote) {
    return this.http.put<Keynote>(`${this.baseUrl}/keynote-service/api/keynotes/${keynote.id}`, newKeynote);
  }
}
