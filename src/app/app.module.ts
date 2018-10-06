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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    IntegrationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
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
    AppRoutingModule
  ],
  providers: [
    SubscriberService,
    CampaignService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
