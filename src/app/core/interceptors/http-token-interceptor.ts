import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenAccess = sessionStorage.getItem('jwt_token');
    // console.log(tokenAccess);
    if (tokenAccess) {
        const headersConfig = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '**',
          'Authorization': `Bearer ${tokenAccess}`
          // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsInNob3AiOiJsdWNreS13aGVlbC1kZW1vLm15c2hvcGlmeS5jb20iLCJpYXQiOjE1MzkwOTg2MDB9.iBOQUa2MZKmv7UDEWAUy5m7i5SXTtF9qyw7jAExV4YI'
        };
        request = request.clone({ setHeaders: headersConfig });
        // console.log(headersConfig);
      }
    return next.handle(request);
  }
}
