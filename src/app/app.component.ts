import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lucky Wheel Admin';
  itemsMenu: MenuItem[];
  itemsBreadrumb: MenuItem[];
  ngOnInit() {
    this.itemsMenu = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Campaign',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        },
        {
            label: 'Subscriber',
            icon: 'pi pi-fw pi-question',
            items: [
                {
                    label: 'Contents'
                },
                {
                    label: 'Search', 
                    icon: 'pi pi-fw pi-search', 
                    items: [
                        {
                            label: 'Text', 
                            items: [
                                {
                                    label: 'Workspace'
                                }
                            ]
                        },
                        {
                            label: 'File'
                        }
                ]}
            ]
        },
        {
            label: 'Integration',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {label: 'Save', icon: 'pi pi-fw pi-save'},
                        {label: 'Update', icon: 'pi pi-fw pi-save'},
                    ]
                },
                {
                    label: 'Other',
                    icon: 'pi pi-fw pi-tags',
                    items: [
                        {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                    ]
                }
            ]
        },
        {
            label: 'Quit', icon: 'pi pi-fw pi-times'
        }
    ];
    this.itemsBreadrumb = [
      {label:'Home',  url: '/'},
      {label:'Campaign', url: '/campaign'}
    ]
  }
}
