import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Keynote} from '../models/Keynote';

@Injectable({
  providedIn: 'root',
})
export class KeynotesService {

  constructor(private http : HttpClient) {
  }

  public getAllKeynotes() : Observable<Array<any>>{
    return this.http.get<Array<Keynote>>('http://localhost:8081/keynotes');
  }

  deleteKeynote(keynote: Keynote) {
    return this.http.delete<Keynote>(`http://localhost:8081/keynotes/${keynote.id}`);
  }

  saveKeynote(keynote: Keynote) {
    return this.http.post<Keynote>('http://localhost:8081/keynotes', keynote);
  }

  updateKeynote(keynote: Keynote, newKeynote: Keynote) {
    return this.http.put<Keynote>(`http://localhost:8081/keynotes/${keynote.id}`, newKeynote);
  }
}
