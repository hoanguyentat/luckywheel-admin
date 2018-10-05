import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../core/models/Campaign';
import { CampaignService } from '../services/campaign.service';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
  providers: [MessageService]
})
export class CampaignComponent implements OnInit {

  campaignForm: FormGroup;
  submitted: boolean;
  genders: SelectItem[];
  description: string;


  campaigns: CampaignModel[];
  cols: any[];
  itemsBreadrumb: MenuItem[];

  constructor(private campaignService: CampaignService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.campaignService.getCampaigns().subscribe(result => {
      this.campaigns = result['data'];
    });

    this.cols = [
        { field: 'vin', header: 'Vin' },
        { field: 'year', header: 'Year' },
        { field: 'brand', header: 'Brand' },
        { field: 'color', header: 'Color' }
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

  onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
  }

  get diagnostic() { return JSON.stringify(this.campaignForm.value); }
}
