import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { DetailCampaignComponent } from './detail-campaign/detail-campaign.component';


const routes: Routes = [
  {path: '', component: CampaignComponent},
  {path: ':id', component: DetailCampaignComponent}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
