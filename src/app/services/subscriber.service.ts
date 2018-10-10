import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {SubscriberModel} from '../core/models/Subscriber';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { environment } from '../../environments/environment';

@Injectable()
export class SubscriberService {

    constructor(private http: HttpClient, private errorsService: ErrorsService) {}
    // subUrl = '/assets/data/cars-large.json'


    getSubscribers(): Observable<SubscriberModel[]> {
        let url = `${environment.domain}/subscribers?page=1&size=20`;
        return this.http.get<SubscriberModel[]>(url)
                    .pipe(
                        tap(_subscribers => {}),
                        catchError(this.errorsService.handleError('getSubscriber', []))
                        );
    }

    getSubscriber(id: number): Observable<SubscriberModel> {
        let url = `${environment.domain}/subscribers?page=1&size=20`;
        return this.http.get<SubscriberModel>(url)
        .pipe(
            tap(subscriber => {}),
            catchError(this.errorsService.handleError<SubscriberModel>("Error get subscriber ${id}"))
        );
    }
}