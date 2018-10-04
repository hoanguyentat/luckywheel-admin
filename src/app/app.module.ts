import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { IntegrationComponent } from './integration/integration.component';
import {DataViewModule} from 'primeng/dataview';
import { SubscriberService } from './services/subscriber.service';

const routes: Routes = [
  {path: 'campaign', loadChildren: './campaign/campaign.module#CampaignModule'},
  {path: 'subscriber', component: SubscriberComponent},
  {path: 'integration', component: IntegrationComponent},
  {path: '**', redirectTo: 'campaign',  pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SubscriberComponent,
    IntegrationComponent
  ], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    MenubarModule,
    BreadcrumbModule,
    HttpClientModule,
    DataViewModule
  ],
  providers: [
    SubscriberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
