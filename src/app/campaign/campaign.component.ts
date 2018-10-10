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
  currentPage = 1;
  pageSize = 20;


  campaigns: CampaignModel[];
  cols: any[];
  itemsBreadrumb: MenuItem[];

  constructor(
    private campaignService: CampaignService,
    private fb: FormBuilder, 
    private messageService: MessageService,
    private route: Router) { }

  ngOnInit() {
    this.campaignService.getList().subscribe(result => {
      this.campaigns = result['content'];
      // console.log(this.campaigns);
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

  removeCampaign(id) {
    this.campaignService.remove(id).subscribe(result => {
      // this.messageService.add({severity:'info', summary:'Success', detail:'Deleted campaign!'});
      setTimeout( () => {
        location.reload();
      }, 500);
    })
  }

  stopCampaign(id: string) {
    this.campaignService.stop(id).subscribe(result => {
      setTimeout( () => {
        location.reload();
      }, 500);
    })
  }

  activeCampaign(id: string) {
    this.campaignService.active(id).subscribe(result => {
      // this.messageService.add({severity:'info', summary:'Success', detail:'Add campaign success!'});  
      setTimeout( () => {
        location.reload();
      }, 500);
    })
  }

  createCampaign(value: string) {
    this.campaignService.create(JSON.stringify(value)).subscribe(result => {
      // this.messageService.add({severity:'info', summary:'Success', detail:'Add campaign success!'});  
      setTimeout( () => {
        location.reload();
      }, 500);
    })
    // this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.campaignForm.value); }
}
