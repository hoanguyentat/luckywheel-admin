import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    sessionStorage.removeItem('jwt_token');
    return true;
  }

  login(token: string) {
    sessionStorage.setItem('jwt_token', token);
    // this.router.navigate['/'];
    return token;
  }
}
