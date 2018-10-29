import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../core/models/Campaign';
import { CampaignService } from '../services/campaign.service';
import { MenuItem, MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MyMessageService } from '../services/message.service';

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
    private myMessService: MyMessageService,
    private route: Router,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit() {
    this.campaignService.getList(this.currentPage, this.pageSize).subscribe(result => {
      this.campaigns = result['content'];
      this.totalCount = result['totalCount'];
      console.log(this.campaigns)
      if(!this.campaigns) {
        this.myMessService.warning("You should create new campaign to continue")
      }
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
      'description': new FormControl(''),
      'startedAt': new FormControl(''),
      'completedAt': new FormControl('')
    });
  }

  paginate($event) {
    this.currentPage = $event.page + 1;
    this.campaignService.getList(this.currentPage, this.pageSize).subscribe(result => {
      this.campaigns = result['content'];
    });
  }

  removeCampaign(id) {
    this.confirmationService.confirm({
      header: 'Delete campaign',
      message: 'Are you sure?',
      accept: () => {
        this.campaignService.remove(id).subscribe(result => {
          setTimeout( () => {
            location.reload();
          }, 200);
        })
      }
    })
  }

  stopCampaign(id: string) {
    this.confirmationService.confirm({
      header: 'Stop campaign',
      message: 'Are you sure?',
      accept: () => {
        this.campaignService.stop(id).subscribe(result => {
          setTimeout( () => {
            location.reload();
          }, 200);
        })
      }
    })
  }

  activeCampaign(id: string) {
    this.campaignService.active(id).subscribe(result => {
      setTimeout( () => {
        location.reload();
      }, 200);
    })
  }

  createCampaign(value: JSON) {
    for(let key of Object.keys(value)) {
      if(value[key] == "") {
        value[key] = null;
      }
    }
    console.log(value)
    this.campaignService.create(JSON.stringify(value)).subscribe(result => {
      setTimeout( () => {
        location.replace(`/#/campaign/${result['id']}/edit`);
        // this.route.navigate[`/#/campaign/${result['id']}/edit`]
      }, 200);
    })
    // this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.campaignForm.value); }
}
