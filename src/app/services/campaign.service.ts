import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CampaignModel } from '../core/models/Campaign';

@Injectable()
export class CampaignService {
    constructor(private http: HttpClient) {}
    getCampaigns() {
        return this.http.get('/assets/data/cars-small.json')
                    .toPromise()
                    .then(res => <CampaignModel[]> res['data'])
                    .then(data => {
                        return data; 
                    });
    }
}
