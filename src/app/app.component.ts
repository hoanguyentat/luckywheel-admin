import { Component, Input, Output } from '@angular/core';
import {MenuItem, ConfirmationService} from 'primeng/api';
import { AuthenticationService } from './services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lucky Wheel Admin';
  itemsMenu: MenuItem[];
  userStatus: any;
  subscription: Subscription;
  itemsBreadrumb: MenuItem[];

  constructor(
    private authService: AuthenticationService, 
    private router: Router, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    ) {
        // received a param from other component
        this.subscription = this.messageService.getMessage().subscribe(message => { 
            this.userStatus = message.userStatus; 
        });
    }

  ngOnInit($event) {
    
    // if(sessionStorage.getItem('jwt_token')) {
    //     this.userStatus = true;
    // } else {
    //     this.userStatus = false;
    // }
    this.itemsMenu = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            url: '/'
        },
        {
            label: 'Campaign',
            icon: 'pi pi-fw pi-bookmark',
            url: '/#/campaign'
        },
        {
            label: 'Subscriber',
            icon: 'pi pi-fw pi-user-plus',
            url: '/#/subscriber'
        },
        {
            label: 'Integration',
            icon: 'pi pi-fw pi-cog',
            url: '/#/integration',
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
        }
    ];

    this.itemsBreadrumb = $event;
  }


  logout() {
    this.confirmationService.confirm({
        message: 'Are you sure?',
        accept: () => {
            this.authService.logout()
            location.reload();
        }
    });
}
}
