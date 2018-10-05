import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {SubscriberModel} from '../core/models/Subscriber';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ErrorsService } from './errors.service';

@Injectable()
export class SubscriberService {

    constructor(private http: HttpClient, private errorsService: ErrorsService) {}
    subUrl = '/assets/data/cars-large.json'

    getSubscribers(): Observable<SubscriberModel[]> {
        return this.http.get<SubscriberModel[]>(this.subUrl)
                    .pipe(
                        tap(subscribers => console.log("fetch data subscriber")),
                        catchError(this.errorsService.handleError('getSubscriber', []))
                        );
    }
}