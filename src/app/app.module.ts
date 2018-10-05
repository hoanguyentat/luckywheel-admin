import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IntegrationComponent } from './integration/integration.component';
import {DataViewModule} from 'primeng/dataview';
import { SubscriberService } from './services/subscriber.service';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { CampaignService } from './services/campaign.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DataTableModule, DataGridModule, PanelModule, DialogModule, TabViewModule, CodeHighlighterModule, ButtonModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'campaign', loadChildren: './campaign/campaign.module#CampaignModule'},
  {path: 'subscriber', loadChildren: './subscriber/subscriber.module#SubscriberModule'},
  {path: 'integration', component: IntegrationComponent},
  {path: '**', redirectTo: 'campaign',  pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    IntegrationComponent
  ], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MenubarModule,
    BreadcrumbModule,
    HttpClientModule,
    DataViewModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true
    }),
    CoreModule,
    CardModule,
    TableModule,
    CodeHighlighterModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    SubscriberService,
    CampaignService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
