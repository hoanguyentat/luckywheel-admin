import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubscriberService } from '../services/subscriber.service';
import { SubscriberModel } from '../core/models/Subscriber';
import { MyMessageService } from '../services/message.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { CampaignService } from '../services/campaign.service';
import { CampaignModel } from '../core/models/Campaign';
import { forEach } from '@angular/router/src/utils/collection';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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

  selectedSubscribers: SubscriberModel[];

  cols: any[];
  subscribers: SubscriberModel[];
  itemsBreadrumb: MenuItem[];

  currentPage = 1;
  pageSize = 20;
  totalCount: number;
  totalPage: number;

  createdAtFilter = 2000;
  createdAtTimeout: any;
  campaigns: CampaignModel[];
  campaignNames: SelectItem[];
  discountCodes: SelectItem[];


  searchForm: FormGroup;
  // @Output() itemsBreadrumbTest = new EventEmitter<MenuItem[]>();

  constructor(
    private subscriberService: SubscriberService, 
    private messageService: MyMessageService, 
    private campaignService: CampaignService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    let data = {
      "page": this.currentPage,
      "size": this.pageSize
    }
    this.subscriberService.getSubscribers(data).subscribe(res => {
      this.subscribers = res['content'];
      this.totalCount = res['totalCount'];
      // console.log(res);
    });

    this.sortOptions = [
      {label: 'Newest First', value: '!createdAt'},
      {label: 'Oldest First', value: 'createdAt'},
      {label: 'Email', value: 'email'}
    ];


    this.itemsBreadrumb = [
      {label:'Home',  url: '/'},
      {label:'Subscriber', url: '/admin/#/subscriber'}
    ]

    this.searchForm = this.fb.group({
      'email': new FormControl('', Validators.email),
      'name': new FormControl(''),
      'campaignId': new FormControl('')
    });

    this.cols = [
      { field: 'fullName', header: 'Full Name' },
      { field: 'email', header: 'Email' },
      { field: 'campaignName', header: 'Campaign Name' },
      { field: 'discountCode', header: 'Discount Code' },
      // { field: 'createdAt', header: 'Created At' }
   ];

    this.campaignService.getList(this.currentPage, this.pageSize).subscribe(res => {
      this.campaigns = res['content'];

      this.campaignNames = this.removeDuplicates(this.campaigns, 'name')
      .map(campaign => {
        let _tmp = {
          "label": campaign['name'],
          "value": campaign['name'],
          "id": campaign['id']
        }
        return _tmp;
      })
    });
  }


  searchSubscribers(data): void {
    this.currentPage = 1;
    // this.pageSize = 20;
    data['page'] = this.currentPage;
    data['size']= this.pageSize;
    this.subscriberService.getSubscribers(data).subscribe(res => {
      this.subscribers = res['content'];
      this.totalCount = res['totalCount'];
    });
  }

  getErrorMessage() {
    
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  paginateSubs($event) {
    this.currentPage = $event.page + 1;
    let data = this.searchForm.value;
    data["page"]= this.currentPage,
    data["size"]= this.pageSize;

    this.subscriberService.getSubscribers(data).subscribe(subs => {
      // console.log(subs['content']);
      this.subscribers = subs['content'];
      this.totalCount = subs['totalCount'];
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

    this.createdAtTimeout = setTimeout(() => {
      dt.filter(event.value.toString(), 'createdAt', 'gt');
    }, 250);
  }
}
