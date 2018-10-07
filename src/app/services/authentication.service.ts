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
    // console.log("remove current user");
    localStorage.removeItem('currentUser');
    return true;
    // localStorage.clear();
  }

  login(shopid: number, token: string) {
    // return this.http.post<any>(`${environment.domain}/users/authenticate`, { shopid: shopid, token: token })
    //         .pipe(map(user => {
    //             // login successful if there's a jwt token in the response
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }
    //             return user;
    //         }));
    let user = {
      shopid: shopid,
      token: token
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
}
