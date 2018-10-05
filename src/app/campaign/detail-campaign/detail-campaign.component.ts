import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { CampaignModel } from '../../core/models/Campaign';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-detail-campaign',
  templateUrl: './detail-campaign.component.html',
  styleUrls: ['./detail-campaign.component.css']
})
export class DetailCampaignComponent implements OnInit {

  campaigns: CampaignModel[];
  cols: any[];
  itemsBreadrumb: MenuItem[];

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignService.getCampaigns().subscribe(result => {
      this.campaigns = result['data'];
    });

    this.cols = [
        { field: 'vin', header: 'Vin' },
        { field: 'year', header: 'Year' },
        { field: 'brand', header: 'Brand' },
        { field: 'color', header: 'Color' }
    ];

    this.itemsBreadrumb = [
      {label:'Home',  url: '/'},
      {label:'Campaign', url: '/campaign'},
      {label:'Detail Campaign'}
    ]
  }

}
