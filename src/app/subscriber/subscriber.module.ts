import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule, TabViewModule, DataGridModule, PanelModule, DialogModule, CodeHighlighterModule, InputTextModule, ButtonModule, SliderModule, MultiSelectModule} from 'primeng/primeng';
import { MatIconModule, MatFormFieldModule, MatToolbarModule, MatInputModule, MatButtonModule, MatMenuModule, MatRippleModule, MatTableModule, MatDatepickerModule, MatCheckboxModule, MatTooltip, MatTooltipModule, MatSlideToggleModule, MatDialogModule, MatExpansionModule, MatNativeDateModule, MatOptionModule, MatSelectModule, MatGridListModule  } from '@angular/material';
import { SubscriberService } from '../services/subscriber.service';
import { SubscriberComponent } from './subscriber.component';
import { SubscriberRoutingModule } from './subscriber-routing.module';
import { DataTableModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { DataViewModule } from 'primeng/dataview';
import { DetailSubscriberComponent } from './detail-subscriber/detail-subscriber.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    TableModule,
    BreadcrumbModule,
    SubscriberRoutingModule,
    DropdownModule,
    DataViewModule,
    DataGridModule,
    DataTableModule,
    PaginatorModule,
    PanelModule,
    DialogModule,
    TabViewModule,
    CodeHighlighterModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    SliderModule,
    MultiSelectModule,

    
    MatExpansionModule,
    MatButtonModule,
    MatNativeDateModule ,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatGridListModule
  ],
  declarations: [
    SubscriberComponent,
    DetailSubscriberComponent
  ],
  providers: [
    SubscriberService,
    MatDatepickerModule,  
  ]
})
export class SubscriberModule { }