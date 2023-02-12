import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi {
  constructor(public override _http: HttpClient) {
    super(_http)
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.get<User[]>(`users?email=${email}`)
      .pipe(map((user: User[]) => user[0] ? user[0] : undefined));
  }

  createNewUser(user: User): Observable<User> {
    return this._http.post<User>(`users`, user)
  }

}
