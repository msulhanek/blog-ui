import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterPayload} from '../register/register-payload';
import {Observable} from 'rxjs';
import {LoginPayload} from '../login/login-payload';
import {JwtAuthResponse} from './jwt-auth-response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) {}

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'register', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse>(this.url + 'login', loginPayload).pipe(map( data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      return true;
    }));
  }

  isAuthenticated(): boolean{
    return this.localStorageService.retrieve('username') != null;
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.router.navigateByUrl('');
    window.location.reload();
  }
}
