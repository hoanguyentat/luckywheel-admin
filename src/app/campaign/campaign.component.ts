import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../core/models/Campaign';
import { CampaignService } from '../services/campaign.service';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
  providers: [MessageService]
})
export class CampaignComponent implements OnInit {

  campaignForm: FormGroup;
  submitted: boolean;
  description: string;
  totalPage: number;
  totalCount: number;
  currentPage = 1;
  pageSize = 5;


  campaigns: CampaignModel[];
  cols: any[];
  itemsBreadrumb: MenuItem[];

  constructor(
    private campaignService: CampaignService,
    private fb: FormBuilder, 
    private messageService: MessageService,
    private route: Router) { }

  ngOnInit() {
    this.campaignService.getList(this.currentPage, this.pageSize).subscribe(result => {
      this.campaigns = result['content'];
      this.totalCount = result['totalCount'];
    });

    this.cols = [
        { field: 'name', header: 'name' },
        { field: 'description', header: 'description' },
        { field: 'createdAt', header: 'createdAt' },
        { field: 'updatedAt', header: 'updatedAt' }
    ];

    this.itemsBreadrumb = [
      {label:'Home',  url: '/'},
      {label:'Campaign', url: '/#/campaign'}
    ];

    this.campaignForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('')
    });
  }

  paginate($event) {
    this.currentPage = $event.page + 1;
    this.campaignService.getList(this.currentPage, this.pageSize).subscribe(result => {
      this.campaigns = result['content'];
    });
  }

  removeCampaign(id) {
    this.campaignService.remove(id).subscribe(result => {
      setTimeout( () => {
        location.reload();
      }, 200);
    })
  }

  stopCampaign(id: string) {
    this.campaignService.stop(id).subscribe(result => {
      setTimeout( () => {
        location.reload();
      }, 200);
    })
  }

  activeCampaign(id: string) {
    this.campaignService.active(id).subscribe(result => {
      setTimeout( () => {
        location.reload();
      }, 200);
    })
  }

  createCampaign(value: string) {
    this.campaignService.create(JSON.stringify(value)).subscribe(result => {
      setTimeout( () => {
        location.reload();
      }, 200);
    })
    // this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.campaignForm.value); }
}
