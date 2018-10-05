import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { CampaignModel } from '../core/models/Campaign';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { ErrorsService } from './errors.service';

@Injectable()
export class CampaignService {
    constructor(private http: HttpClient, private messageService: MessageService, private errorsService: ErrorsService) {}
    getCampaigns(): Observable<CampaignModel[]> {
        return this.http.get<CampaignModel[]>('/assets/data/cars-small.json')
                    .pipe(
                        tap(campaigns => this.messageService.info('fetched campaigns')),
                        catchError(this.errorsService.handleError('getCampaigns', []))
                    );
    }
}
