import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { CampaignModel } from '../../core/models/Campaign';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { SubscriberModel } from '../../core/models/Subscriber';
import { SubscriberService } from '../../services/subscriber.service';
import { SliceModel } from '../../core/models/Slice';
import { MyMessageService } from '../../services/message.service';

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

  currentPageSub = 1;
  totalSubs: number;
  pageSizeSubs = 10;

  selectedSubscribers: SubscriberModel[];
  constructor(private campaignService: CampaignService, private activateRoute: ActivatedRoute, private messageService: MyMessageService) { }

  ngOnInit() {

    this.campaignId = this.activateRoute.snapshot.paramMap.get('id');

    this.campaignService.getDetail(this.campaignId).subscribe(result => {
      this.campaign = result;
      this.slices = result['slices'];
      // console.log(this.slices);
      if(!this.slices) {
        this.messageService.warning("You should setup your spinner slices to continue");
      }
    });

    this.campaignService.getSubscribers(this.campaignId, this.currentPageSub, this.pageSizeSubs).subscribe( subs => {
      this.totalSubs = subs['totalCount'];
      this.subscribers = subs['content'];
    })

    this.colsSlice = [
        // { field: 'index', header: 'Index' },
        { field: 'label', header: 'Label' },
        { field: 'discountCode', header: 'Discount Code' },
        { field: 'probability', header: 'Probability' },
    ];

    this.colsSub = [
      { field: 'fullName', header: 'Full Name' },
      { field: 'email', header: 'Email' },
      { field: 'campaignName', header: 'Campaign Name' },
      { field: 'discountCode', header: 'Coupon' },
      { field: 'createdAt', header: 'Created Time' }
    ]

    this.itemsBreadrumb = [
      {label:'Home',  url: '/#/'},
      {label:'Campaign', url: '/#/campaign'},
      {label:'Detail Campaign'}
    ]
  }

  paginateSubs($event) {
    this.currentPageSub = $event.page + 1;
    this.campaignService.getSubscribers(this.campaignId, this.currentPageSub, this.pageSizeSubs).subscribe(subs => {
      this.subscribers = subs['content'];
    });
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
