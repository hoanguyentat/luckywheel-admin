import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { CampaignModel } from '../core/models/Campaign';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { ErrorsService } from './errors.service';
import { environment } from '../../environments/environment';

@Injectable()
export class CampaignService {

    constructor(private http: HttpClient, private messageService: MessageService, private errorsService: ErrorsService) {}

    getCampaigns(): Observable<CampaignModel[]> {
        let urlCamps = '/assets/data/cars-small.json';
        return this.http.get<CampaignModel[]>(urlCamps)
            .pipe(
                tap(_campaigns => {}),
                catchError(this.errorsService.handleError('getCampaigns', []))
            );
    }

    getCampaign(id: number): Observable<CampaignModel> {
        let urlDetail = '/assets/data/cars-small.json'    
        return this.http.get<CampaignModel>(urlDetail)
            .pipe(
                tap(_campaign => {}),
                catchError(this.errorsService.handleError<CampaignModel>('Error get campaign id = ${id}'))
            );
    }
}
