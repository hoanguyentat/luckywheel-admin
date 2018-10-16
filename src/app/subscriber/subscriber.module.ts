import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule, TabViewModule, DataGridModule, PanelModule, DialogModule, CodeHighlighterModule, InputTextModule, ButtonModule, SliderModule, MultiSelectModule} from 'primeng/primeng';
import { SubscriberService } from '../services/subscriber.service';
import { SubscriberComponent } from './subscriber.component';
import { SubscriberRoutingModule } from './subscriber-routing.module';
import { DataTableModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { DataViewModule } from 'primeng/dataview';
import { DetailSubscriberComponent } from './detail-subscriber/detail-subscriber.component';

@NgModule({
  imports: [
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
    MultiSelectModule

  ],
  declarations: [
    SubscriberComponent,
    DetailSubscriberComponent
  ],
  providers: [
    SubscriberService
  ]
})
export class SubscriberModule { }