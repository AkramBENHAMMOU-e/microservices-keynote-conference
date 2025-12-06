import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  private readonly baseUrl = 'http://localhost:8888';

  constructor(private http: HttpClient) {
  }


  public getAllConfernces() : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.baseUrl}/conference-service/api/conferences`);
  }
  public saveConfernce(conference: any) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/conference-service/api/conferences`, conference);
  }

  public deleteConference(conference: any){
    return this.http.delete<any>(`${this.baseUrl}/conference-service/api/conferences/${conference.id}`);
  }


  public getTypes() : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.baseUrl}/conference-service/api/types`);
  }

  public getKeynotesByConference(confId : String) : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.baseUrl}/conference-service/api/conferences/${confId}/keynotes`);
  }

  public addKeynoteToConference(conferenceId : String, keynoteId : Array<any>) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/conference-service/api/conferences/${conferenceId}/keynotes`, keynoteId)
  }

  public deleteKeynoteFromConference(conferenceId : String, keynoteId : String) : Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/conference-service/api/conferences/${conferenceId}/keynotes/${keynoteId}`);
  }

  public updateConference(conference: any, newConference: any) : Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/conference-service/api/conferences/${conference.id}`, newConference);
  }
}
