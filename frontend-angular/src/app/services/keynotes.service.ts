import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeynotesService {

  constructor(private http : HttpClient) {
  }

  public getAllKeynotes() : Observable<Array<any>>{
    return this.http.get<Array<any>>('http://localhost:8081/keynotes');
  }

  deleteKeynote(keynote: any) {
    return this.http.delete<any>(`http://localhost:8081/keynotes/${keynote.id}`);
  }
}
