import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';
import { CampaignModel } from '../../core/models/Campaign';
import { ActivatedRoute } from '@angular/router';
import { SliceModel } from '../../core/models/Slice';

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
  slices: SliceModel[];
  itemsBreadrumb: MenuItem[];
  campaignId: string;
  campaignName: string;
  colsSlice: any[];

  displayDialog: boolean;
  slice: SliceModel;
  newSlice: boolean;
  selectedSlice: SliceModel;

  constructor(
    private campaignService: CampaignService, 
    private fb: FormBuilder, 
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    ) { }

  ngOnInit() {

    this.campaignId = this.activateRoute.snapshot.paramMap.get('id');
    this.campaignForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'startedAt': new FormControl(''),
      'completedAt': new FormControl('')
    });

    this.campaignService.getDetail(this.campaignId).subscribe(result => {
      this.campaignName = result['name'];
      this.campaignForm.setValue({
        "name": result['name'],
        "description": result['description'],
        "startedAt": result['startedAt'] ? new Date(result['startedAt']): null,
        "completedAt": result['completedAt'] ? new Date(result['completedAt']): null
      });
      if(result['slices']) {
        this.slices = result['slices'];
      }
    });

    this.colsSlice = [
      // { field: 'index', header: 'Index' },
      { field: 'label', header: 'Label' },
      { field: 'discountCode', header: 'Discount Code' },
      { field: 'probability', header: 'Probability' },
    ];

    this.itemsBreadrumb = [
      {label:'Home',  url: '/admin/#/'},
      {label:'Campaigns', url: '/admin/#/campaign'},
      {label:'Edit Campaign'},
    ];
  }

  showDialogToAdd() {
    this.newSlice = true;
    this.slice = new SliceModel({});
    this.displayDialog = true;
  }

  save() {
    let slices: Array<SliceModel> = [];
    if (this.slices) {
      slices = [...this.slices];
    } else {
    }
    // console.log(this.slice)
    if (this.newSlice)
        slices.push(this.slice);
    else
        slices[this.slices.indexOf(this.selectedSlice)] = new SliceModel(this.slice);

    this.slices = slices;
    this.slice = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.slices.indexOf(this.selectedSlice);
    this.slices = this.slices.filter((val, i) => i != index);
    this.slice = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    // console.log(event.data)
    this.newSlice = false;
    this.slice = new SliceModel(this.cloneSlice(event.data));
    this.displayDialog = true;
  }

  cloneSlice(slice: SliceModel): SliceModel {
    let cslice= new SliceModel({});
    for (let prop in slice) {
        
        if (slice[prop] !== "") {
          cslice[prop] = slice[prop];
        } else {
          cslice[prop] = null;
        }
    }
    // console.log(cslice);
    return cslice;
  }

  updateCampaign(){
    let data = {
      "name": this.campaignForm.value['name'],
      "description": this.campaignForm.value['description'],
      "slices": this.slices,
      "startedAt": this.campaignForm.value['startedAt'],
      "completedAt": this.campaignForm.value['completedAt'],
    }
    // console.log(data);

    this.campaignService.update(this.campaignId, data).subscribe(res => {  
      if(res) {
        window.location.replace(`/admin/#/campaign/${this.campaignId}`)
      }
    }, err => {
      // console.log(err);
    })
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
  }

  get diagnostic() { return JSON.stringify(this.campaignForm.value); }
}
