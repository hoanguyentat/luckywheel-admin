import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationComponent } from './integration/integration.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'campaign', loadChildren: './campaign/campaign.module#CampaignModule'},
  {path: 'subscriber', loadChildren: './subscriber/subscriber.module#SubscriberModule'},
  {path: 'integration', component: IntegrationComponent},
  {path: '**', redirectTo: 'campaign',  pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: []
})
export class AppRoutingModule { }
