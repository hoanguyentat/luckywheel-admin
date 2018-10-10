import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('jwt_token')) {
            return true;
        }

        this.router.navigate(['/authentication'], { queryParams: { redirectUrl: state.url }});
        return false;
    }
}

export default AuthGuard;