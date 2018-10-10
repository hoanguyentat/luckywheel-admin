import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MenubarModule} from 'primeng/menubar';
import { BreadcrumbModule} from 'primeng/breadcrumb';
import { HttpClientModule } from '@angular/common/http';
import { IntegrationComponent } from './integration/integration.component';
import { DataViewModule} from 'primeng/dataview';
import { SubscriberService } from './services/subscriber.service';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { CampaignService } from './services/campaign.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthenticationService } from './services/authentication.service';
import AuthGuard from './_guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    IntegrationComponent,
    LoginComponent,
    HomeComponent,
  ], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
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
    ProgressSpinnerModule,
    ConfirmDialogModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    SubscriberService,
    CampaignService,
    AuthenticationService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
