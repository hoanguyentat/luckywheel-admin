import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubscriberService } from '../services/subscriber.service';
import { SubscriberModel } from '../core/models/Subscriber';
import { MessageService } from '../services/message.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { CampaignService } from '../services/campaign.service';
import { CampaignModel } from '../core/models/Campaign';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  sortOptions: SelectItem[];

  sortKey: string;
  displayDialog: boolean;
  sortField: string;

  sortOrder: number;

  selectedSubscriber: SubscriberModel;

  cols: any[];
  subscribers: SubscriberModel[];
  itemsBreadrumb: MenuItem[];

  currentPage = 1;
  pageSize = 20;
  totalCount: number;
  totalPage: number;

  createdAtFilter = 2000;
  createdAtTimeout: any;
  campaignNames: SelectItem[];
  discountCodes: SelectItem[];

  // @Output() itemsBreadrumbTest = new EventEmitter<MenuItem[]>();

  constructor(private subscriberService: SubscriberService, private messageService: MessageService, private campaignService: CampaignService) { }

  ngOnInit() {
    this.subscriberService.getSubscribers(this.currentPage, this.pageSize).subscribe(result => {
      this.subscribers = result['content'];
      // console.log(result);
    });

    this.sortOptions = [
      {label: 'Newest First', value: '!createdAt'},
      {label: 'Oldest First', value: 'createdAt'},
      {label: 'Email', value: 'email'}
    ];


    this.itemsBreadrumb = [
      {label:'Home',  url: '/'},
      {label:'Subscriber', url: '/#/subscriber'}
    ]

    // this.itemsBreadrumbTest.emit(this.itemsBreadrumb)

    this.cols = [
      { field: 'fullName', header: 'Full Name' },
      { field: 'email', header: 'Email' },
      { field: 'campaignName', header: 'Campaign Name' },
      { field: 'discountCode', header: 'Coupon' },
      { field: 'createdAt', header: 'Created At' }
   ];

    this.campaignService.getList(this.currentPage, this.pageSize).subscribe(result => {
      const campains = result['content'];
      // this.campaignNames = campains.map(campaign => {
      //   let _tmp = {
      //     "label": campaign['name'],
      //     "value": campaign['name']
      //   }
      //   return _tmp;
      // })

      this.campaignNames = this.removeDuplicates(campains, 'name').map(campaign => {
        let _tmp = {
          "label": campaign['name'],
          "value": campaign['name']
        }
        return _tmp;
      })
      // console.log(this.campaignNames);
    });
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  paginateSubs($event) {
    this.currentPage = $event.page + 1;
    this.subscriberService.getSubscribers(this.currentPage, this.pageSize).subscribe(subs => {
      this.subscribers = subs['content'];
    });
  }

  selectSubscriber(event: Event, subscriber: SubscriberModel) {
    this.selectedSubscriber = subscriber;
    this.displayDialog = true;
    event.preventDefault();
  }

  onDialogHide() {
      this.selectedSubscriber = null;
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onCreatedAtChange(event, dt) {
    if (this.createdAtTimeout) {
        clearTimeout(this.createdAtTimeout);
    }
    // console.log(event);

    this.createdAtTimeout = setTimeout(() => {
      dt.filter(event.value.toString(), 'createdAt', 'gt');
    }, 250);
  }
}
