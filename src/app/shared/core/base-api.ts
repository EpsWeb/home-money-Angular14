import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BaseApi {

  private baseUrl = 'http://localhost:3000/'

  constructor(public _http: HttpClient) {
  }

  private getUrl(url = ''): string {
    return this.baseUrl + url
  }

  public get<T>(url = '') {
    return this._http.get<T>(this.getUrl(url))
  }

  public post<T>(url = '', data: any = {}): Observable<any> {
    return this._http.post<T>(this.getUrl(url), data)
  }

  public put<T>(url = '', data: any = {}): Observable<any> {
    return this._http.put<T>(this.getUrl(url), data)
  }

}
