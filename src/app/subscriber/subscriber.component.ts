import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubscriberService } from '../services/subscriber.service';
import { SubscriberModel } from '../core/models/Subscriber';
import { MessageService } from '../services/message.service';
import { MenuItem, SelectItem } from 'primeng/api';

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

  // @Output() itemsBreadrumbTest = new EventEmitter<MenuItem[]>();

  constructor(private subscriberService: SubscriberService, private messageService: MessageService) { }

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

}
