import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../core/models/Campaign';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  cars: CampaignModel[];
  cols: any[];

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignService.getCampaigns().then(cars => {
      console.log(cars);
      this.cars = cars;
    });

    this.cols = [
        { field: 'vin', header: 'Vin' },
        { field: 'year', header: 'Year' },
        { field: 'brand', header: 'Brand' },
        { field: 'color', header: 'Color' }
    ];
  }
}
