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


    getSubscribers(data): Observable<SubscriberModel[]> {
        let url = `${environment.domain}/subscribers?`;
        let count = 1;
        let dataKeys = Object.keys(data);
        for(let key in data) {
            if(data[key] == "" || data[key] == null){
                count++;
                continue;
            }
            if (count < dataKeys.length){
                url = url + key + "=" + data[key] + "&";
                count++;
            } else {
                url = url + key + "=" + data[key];
            }
        };
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
            tap(_subscriber => {}),
            catchError(this.errorsService.handleError<SubscriberModel>("Error get subscriber ${id}"))
        );
    }
}