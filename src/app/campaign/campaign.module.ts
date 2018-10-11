import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { DetailCampaignComponent } from './detail-campaign/detail-campaign.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CampaignService } from '../services/campaign.service';
import { BreadcrumbModule} from 'primeng/breadcrumb';
import {
  ButtonModule, MessageModule, PanelModule, 
  DropdownModule, InputTextModule, InputTextareaModule, 
  TabViewModule, CodeHighlighterModule, ToolbarModule, 
  SplitButtonModule,
  MenubarModule,
  MessageService,
  DialogModule,
  ConfirmDialogModule
} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'node_modules/primeng/toast';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';

@NgModule({
  imports: [
    CommonModule,
    CampaignRoutingModule,
    CardModule,
    TableModule,
    ButtonModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    SplitButtonModule,
    MenubarModule,
    DialogModule,
    ConfirmDialogModule,
    CodeHighlighterModule
  ],
  declarations: [
    CampaignComponent,
    DetailCampaignComponent,
    EditCampaignComponent
  ],
  providers: [
    CampaignService,
    MessageService
  ]
})
export class CampaignModule { }
