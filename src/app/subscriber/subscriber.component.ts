import { Component, OnInit } from '@angular/core';
import { SubscriberService } from '../services/subscriber.service';
import { SubscriberModel } from '../core/models/Subscriber';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  cars: SubscriberModel[];
  constructor(private subscriberService: SubscriberService) { }

  ngOnInit() {
    this.subscriberService.getSubscribers().then(data => {
      console.log(data);
      this.cars = data
    });
  }

}
