import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  pipe = new DatePipe('en-US');
  configUrl = 'getEvents';
  constructor(private http: HttpClient) { }

 public getEvents(startDate, timePeriodId) :Observable<any> {
   let shortDate=this.pipe.transform(startDate, 'yyyy-MM-dd');
   let url='http://localhost:8181/'+'getEvents'+'/'+shortDate+'/'+timePeriodId;
    return this.http.get<any>(url);
  }

  public getEventDetails(eventId) :Observable<any> {
   
    let url='http://localhost:8181/'+'getEventDetails'+'/'+eventId;
     return this.http.get<any>(url);
   }
}
