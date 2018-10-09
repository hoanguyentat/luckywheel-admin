import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';
import { CampaignModel } from '../../core/models/Campaign';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})

export class EditCampaignComponent implements OnInit {

  itemsMenu: MenuItem[];
  campaignForm: FormGroup;
  submitted: boolean;
  description: string;
  cars: CampaignModel[];

  constructor(private campaignService: CampaignService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.campaignForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('')
    });

    this.campaignService.getCampaigns().subscribe(result => {
      this.cars = result['data'];
    });
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
  }

  get diagnostic() { return JSON.stringify(this.campaignForm.value); }
}
