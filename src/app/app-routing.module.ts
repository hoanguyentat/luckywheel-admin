import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationComponent } from './integration/integration.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import AuthGuard from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'campaign', loadChildren: './campaign/campaign.module#CampaignModule', canActivate: [AuthGuard]},
  {path: 'subscriber', loadChildren: './subscriber/subscriber.module#SubscriberModule', canActivate: [AuthGuard]},
  {path: 'integration', component: IntegrationComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'authentication', component: HomeComponent},
  {path: '**', redirectTo: 'authentication',  pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: []
})
export class AppRoutingModule { }
