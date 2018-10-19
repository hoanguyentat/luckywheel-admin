import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { CampaignModel } from '../core/models/Campaign';
import { Observable, of } from 'rxjs';
import { MyMessageService } from './message.service';
import { ErrorsService } from './errors.service';
import { environment } from '../../environments/environment';
import { SubscriberModel } from '../core/models/Subscriber';

@Injectable()
export class CampaignService {

    urlDomain = environment.domain;
    constructor(private http: HttpClient, private messageService: MyMessageService, private errorsService: ErrorsService) {}

    getList(page: number, size: number): Observable<CampaignModel[]> {
        // let urlCamps = '/assets/data/cars-small.json';
        let urlCamps = `${this.urlDomain}/campaigns?page=${page}&size=${size}`;
        return this.http.get<CampaignModel[]>(urlCamps)
            .pipe(
                tap(_campaigns => {}),
                catchError(this.errorsService.handleError('getCampaigns', []))
            );
    }

    getDetail(id: string): Observable<CampaignModel> {
        // let urlDetail = '/assets/data/cars-small.json'
        let urlDetail = `${this.urlDomain}/campaigns/${id}`;      
        return this.http.get<CampaignModel>(urlDetail)
        .pipe(
            tap(_campaign => {}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        );
    }

    getSubscribers(campaignId: string, page: number, size: number): Observable<SubscriberModel[]> {
        let url = `${this.urlDomain}/subscribers?campaignId=${campaignId}&page=${page}&size=${size}`;      
        return this.http.get<SubscriberModel[]>(url)
        .pipe(
            tap(_campaign => {}),
            catchError(this.errorsService.handleError(`Error: `, []))
        );
    }

    create(data): Observable<CampaignModel> {
        let url = `${this.urlDomain}/campaigns`;
        return this.http.post<CampaignModel>(url, data).pipe(
            tap(_campaign => {this.messageService.info("Created campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }

    stop(id: string): Observable<CampaignModel> {
        let url = `${this.urlDomain}/campaigns/${id}/deactivate`;
        // console.log(url);
        return this.http.post<CampaignModel>(url, {}).pipe(
            tap(_campaign => {this.messageService.info("Stopped campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }

    active(id: string):  Observable<CampaignModel> {
        let url = `${this.urlDomain}/campaigns/${id}/activate`;
        console.log(url);
        return this.http.post<CampaignModel>(url, {}).pipe(
            tap(_campaign => {this.messageService.info("Activated campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }

    update(id: string, data: any) {
        let url = `${this.urlDomain}/campaigns/${id}`;
        return this.http.patch<CampaignModel>(url, data).pipe(
            tap(_campaign => {this.messageService.info("Updated campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }

    remove(id: string): Observable<CampaignModel> {
        let url = `${this.urlDomain}/campaigns/${id}`;
        return this.http.delete<CampaignModel>(url).pipe(
            tap(_campaign => {this.messageService.info("Deleted campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }
}
