import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {WfmEvent} from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends BaseApi {

  constructor(public override _http: HttpClient) {
    super(_http)
  }



  getEvents(): Observable<WfmEvent[]> {
    return this.get<WfmEvent[]>('events');
  }

  addEvent(event: WfmEvent): Observable<WfmEvent> {
    return this.post<WfmEvent>('events', event);
  }

  getEventById(id: string): Observable<WfmEvent> {
    return this.get(`events/${id}`);
  }
 }
























