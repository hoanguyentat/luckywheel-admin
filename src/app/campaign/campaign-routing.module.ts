import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { DetailCampaignComponent } from './detail-campaign/detail-campaign.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';


const routes: Routes = [
  {path: '', component: CampaignComponent},
  {path: ':id', component: DetailCampaignComponent},
  {path: ':id/edit', component: EditCampaignComponent}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class CampaignRoutingModule { }
