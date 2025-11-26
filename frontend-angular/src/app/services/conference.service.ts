import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor(private http: HttpClient) {
  }


  public getAllConfernces() : Observable<Array<any>> {
    return this.http.get<Array<any>>('http://localhost:8082/api/conferences');
  }
  public saveConfernce(conference: any) : Observable<any> {
    return this.http.post<any>('http://localhost:8082/api/conferences', conference);
  }

  public deleteConference(conference: any){
    return this.http.delete<any>(`http://localhost:8082/api/conferences/${conference.id}`);
  }


  public getTypes() : Observable<Array<any>> {
    return this.http.get<Array<any>>('http://localhost:8082/api/types');
  }
}
