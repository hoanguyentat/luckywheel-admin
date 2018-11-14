import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../core/models/Campaign';
import { CampaignService } from '../services/campaign.service';
import { MenuItem, MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MyMessageService } from '../services/message.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  _unsubscribeAll: Subject<any>


  campaigns: CampaignModel[] = [];
  cols: any[];
  itemsBreadrumb: MenuItem[];

  constructor(
    private campaignService: CampaignService,
    private fb: FormBuilder, 
    private messageService: MessageService,
    private myMessService: MyMessageService,
    private route: Router,
    private confirmationService: ConfirmationService,
    ) { 
      this._unsubscribeAll = new Subject();
    }

  ngOnInit() {
    this.campaignService.getList(this.currentPage, this.pageSize).subscribe(result => {
      this.campaigns = result['content'];
      this.totalCount = result['totalCount'];
      // console.log(this.campaigns)
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
      {label:'Campaign', url: '/admin/#/campaign'}
    ];

    this.campaignForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'startedAt': new FormControl(''),
      'completedAt': new FormControl('')
    });

    // Subscribe for event campaign change

    this.campaignService.onCampaignAdded
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(newCampaign => {
          const campaignIndex = this.campaigns.findIndex(campaign => campaign.id === newCampaign.id);
          this.campaigns.splice(campaignIndex, 1);
          this.campaigns.splice(campaignIndex, 0, newCampaign);
      });

    this.campaignService.onCampaignUpdated
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(updatedCampaign => {
          const campaignIndex = this.campaigns.findIndex(campaign => campaign.id === updatedCampaign.id);
          this.campaigns.splice(campaignIndex, 1);
          this.campaigns.splice(campaignIndex, 0, updatedCampaign);
      });

    this.campaignService.onCampaignDeleted
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(campaignId => {
        const campaignIndex = this.campaigns.findIndex(campaign => campaign.id === campaignId);
        this.campaigns.splice(campaignIndex, 1);
        this.totalCount = this.totalCount - 1;
      });
  }

  paginate($event) {
    this.currentPage = $event.page + 1;
    this.campaignService.getList(this.currentPage, this.pageSize).subscribe(res => {
      this.campaigns = res['content'];
    });
  }

  removeCampaign(id) {
    this.confirmationService.confirm({
      header: 'Delete campaign',
      message: 'Are you sure?',
      accept: () => {
        this.campaignService.remove(id).subscribe(res => {
          // console.log(res)
          // if (res) {
            this.campaignService.onCampaignDeleted.next(id);
          // }
        }, err => {
          // console.log("Delete error");
        })
      }
    })
  }

  stopCampaign(id: string) {
    this.confirmationService.confirm({
      header: 'Stop campaign',
      message: 'Are you sure?',
      accept: () => {
        this.campaignService.stop(id).subscribe(res => {
          if (res) {
            this.campaignService.onCampaignUpdated.next(res);
          }
        })
      }
    })
  }

  activeCampaign(id: string) {
    this.campaignService.active(id).subscribe(res => {
      if (res) {
        this.campaignService.onCampaignUpdated.next(res);
      }
    })
  }

  createCampaign(value: JSON) {
    for(let key of Object.keys(value)) {
      if(value[key] == "") {
        value[key] = null;
      }
    }
    // console.log(value)
    this.campaignService.create(JSON.stringify(value))
    .subscribe(res => {
      if (res) {
        setTimeout( () => {
          location.replace(`/admin/#/campaign/${res['id']}/edit`);
        }, 200);
      }
    }, err => {
      // console.log(err);
    })
  }

  get diagnostic() { return JSON.stringify(this.campaignForm.value); }
}
