import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {SubscriberModel} from '../core/models/Subscriber';

@Injectable()
export class SubscriberService {

    constructor(private http: HttpClient) {}

    getSubscribers() {
        return this.http.get('/assets/data/cars-large.json')
                    .toPromise()
                    .then(res => <SubscriberModel[]> res['data'])
                    .then(data => { 
                        // console.log(data);
                        return data;
                    });
    }
}