import { Component, OnInit } from '@angular/core';
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

  constructor(private subscriberService: SubscriberService, private messageService: MessageService) { }

  ngOnInit() {
    this.subscriberService.getSubscribers().subscribe(result => {
      // console.log(result)
      this.subscribers = result['data'];
    });

    this.sortOptions = [
      {label: 'Newest First', value: '!year'},
      {label: 'Oldest First', value: 'year'},
      {label: 'Brand', value: 'brand'}
  ];

    this.itemsBreadrumb = [
      {label:'Home',  url: '/'},
      {label:'Subscriber', url: '/subscriber'}
    ]

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
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
