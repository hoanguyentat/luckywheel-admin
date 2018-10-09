import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { CampaignModel } from '../../core/models/Campaign';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-detail-campaign',
  templateUrl: './detail-campaign.component.html',
  styleUrls: ['./detail-campaign.component.css']
})
export class DetailCampaignComponent implements OnInit {

  campaigns: CampaignModel[];
  cols: any[];
  itemsBreadrumb: MenuItem[];

  cars: CampaignModel[];
  selectedCars: CampaignModel[];

  constructor(private campaignService: CampaignService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {

    let id = this.activateRoute.snapshot.paramMap.get('id');
    
    this.campaignService.getCampaigns().subscribe(result => {
      this.campaigns = result['data'];
      this.cars = result['data'];
    });

    this.cols = [
        { field: 'vin', header: 'Vin' },
        { field: 'year', header: 'Year' },
        { field: 'brand', header: 'Brand' },
        { field: 'color', header: 'Color' }
    ];

    this.itemsBreadrumb = [
      {label:'Home',  url: '/#/'},
      {label:'Campaign', url: '/#/campaign'},
      {label:'Detail Campaign'}
    ]
  }

}
