import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { DetailCampaignComponent } from './detail-campaign/detail-campaign.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import { CampaignService } from '../services/campaign.service';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  imports: [
    CommonModule,
    CampaignRoutingModule,
    CardModule,
    TableModule,
    BreadcrumbModule
  ],
  declarations: [
    CampaignComponent,
    DetailCampaignComponent
  ],
  providers: [
    CampaignService
  ]
})
export class CampaignModule { }
