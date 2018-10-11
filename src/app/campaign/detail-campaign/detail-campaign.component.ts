import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { CampaignModel } from '../../core/models/Campaign';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { SubscriberModel } from '../../core/models/Subscriber';
import { SubscriberService } from '../../services/subscriber.service';
import { SliceModel } from '../../core/models/Slice';

@Component({
  selector: 'app-detail-campaign',
  templateUrl: './detail-campaign.component.html',
  styleUrls: ['./detail-campaign.component.css']
})
export class DetailCampaignComponent implements OnInit {

  campaign: CampaignModel;
  slices: SliceModel[];
  colsSlice: any[];
  colsSub: any[];
  itemsBreadrumb: MenuItem[];
  campaignId: string;

  subscribers: SubscriberModel[];
  selectedSubscribers: SubscriberModel[];
  constructor(private campaignService: CampaignService, private activateRoute: ActivatedRoute, private subService: SubscriberService) { }

  ngOnInit() {

    this.campaignId = this.activateRoute.snapshot.paramMap.get('id');

    this.campaignService.getDetail(this.campaignId).subscribe(result => {
      // console.log(result);
      this.campaign = result;
      this.slices = result['slices'];
    });

    this.subService.getSubscribers().subscribe( subs => {
      // console.log(subs);
      this.subscribers = subs['content'];
    })

    this.colsSlice = [
        { field: 'index', header: 'Index' },
        { field: 'label', header: 'Label' },
        { field: 'discountCode', header: 'DiscountCode' },
        { field: 'probability', header: 'Probability' },
    ];

    this.colsSub = [
      { field: 'fullName', header: 'Full Name' },
      { field: 'email', header: 'Email' },
      { field: 'createdAt', header: 'Created At' }
    ]

    this.itemsBreadrumb = [
      {label:'Home',  url: '/#/'},
      {label:'Campaign', url: '/#/campaign'},
      {label:'Detail Campaign'}
    ]
  }

  stopCampaign(id: string) {
    this.campaignService.stop(id).subscribe(result => {
      setTimeout( () => {
        location.reload();
      }, 1000);
    })
  }

  activeCampaign(id: string) {
    this.campaignService.active(id).subscribe(result => {
      // this.messageService.add({severity:'info', summary:'Success', detail:'Add campaign success!'});  
      setTimeout( () => {
        location.reload();
      }, 1000);
    })
  }

}
