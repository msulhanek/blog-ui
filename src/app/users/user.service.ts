import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserPayload} from './user-payload';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<Array<UserPayload>>{
    return this.httpClient.get<Array<UserPayload>>('http://localhost:8080/api/users/');
  }

  getUser(usernameLink: string): Observable<UserPayload> {
    return this.httpClient.get<UserPayload>('http://localhost:8080/api/users/' + usernameLink);
  }

  editUser(username: string, user: UserPayload) {
    return this.httpClient.put('http://localhost:8080/api/users/' + username, user);
  }
}
