import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { CampaignModel } from '../core/models/Campaign';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MyMessageService } from './message.service';
import { ErrorsService } from './errors.service';
import { environment } from '../../environments/environment';
import { SubscriberModel } from '../core/models/Subscriber';

@Injectable()
export class CampaignService {

    baseUrl = environment.domain;

    onCampaignAdded  : BehaviorSubject<CampaignModel>;
    onCampaignUpdated: BehaviorSubject<CampaignModel>;
    onCampaignDeleted: BehaviorSubject<any>;

    constructor(
        private http: HttpClient, 
        private messageService: MyMessageService, 
        private errorsService: ErrorsService
    ) {
        this.onCampaignAdded = new BehaviorSubject(new CampaignModel({}));
        this.onCampaignUpdated = new BehaviorSubject(new CampaignModel({}));
        this.onCampaignDeleted = new BehaviorSubject({});

    }

    getList(page: number, size: number): Observable<CampaignModel[]> {
        // let urlCamps = '/assets/data/cars-small.json';
        let urlCamps = `${this.baseUrl}/campaigns?page=${page}&size=${size}`;
        return this.http.get<CampaignModel[]>(urlCamps)
            .pipe(
                tap(_campaigns => {}),
                catchError(this.errorsService.handleError('getCampaigns', []))
            );
    }

    getDetail(id: string): Observable<CampaignModel> {
        // let urlDetail = '/assets/data/cars-small.json'
        let urlDetail = `${this.baseUrl}/campaigns/${id}`;      
        return this.http.get<CampaignModel>(urlDetail)
        .pipe(
            tap(_campaign => {}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        );
    }

    getSubscribers(campaignId: string, page: number, size: number): Observable<SubscriberModel[]> {
        let url = `${this.baseUrl}/subscribers?campaignId=${campaignId}&page=${page}&size=${size}`;      
        return this.http.get<SubscriberModel[]>(url)
        .pipe(
            tap(_campaign => {}),
            catchError(this.errorsService.handleError(`Error: `, []))
        );
    }

    create(data): Observable<CampaignModel> {
        let url = `${this.baseUrl}/campaigns`;
        return this.http.post<CampaignModel>(url, data).pipe(
            tap(_campaign => {this.messageService.info("Created campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }

    stop(id: string): Observable<CampaignModel> {
        let url = `${this.baseUrl}/campaigns/${id}/deactivate`;
        return this.http.post<CampaignModel>(url, {}).pipe(
            tap(_campaign => {this.messageService.info("Stopped campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }

    active(id: string):  Observable<CampaignModel> {
        let url = `${this.baseUrl}/campaigns/${id}/activate`;
        // console.log(url);
        return this.http.post<CampaignModel>(url, {}).pipe(
            tap(_campaign => {this.messageService.info("Activated campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }

    update(id: string, data: any) {
        let url = `${this.baseUrl}/campaigns/${id}`;
        return this.http.patch<CampaignModel>(url, data).pipe(
            tap(_campaign => {this.messageService.info("Updated campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }

    remove(id: string): Observable<CampaignModel> {
        let url = `${this.baseUrl}/campaigns/${id}`;
        return this.http.delete<CampaignModel>(url).pipe(
            tap(_campaign => {this.messageService.info("Deleted campaign!")}),
            catchError(this.errorsService.handleError<CampaignModel>(`Error: `))
        )
    }
}
