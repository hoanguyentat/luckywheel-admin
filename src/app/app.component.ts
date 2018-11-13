import { Component, Input, Output } from '@angular/core';
import {MenuItem, ConfirmationService} from 'primeng/api';
import { AuthenticationService } from './services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyMessageService } from './services/message.service';

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
    private messageService: MyMessageService
    ) {
        // received a param from other component
        this.subscription = this.messageService.getMessage().subscribe(message => { 
            this.userStatus = message.userStatus; 
        });
    }

  ngOnInit() {
    
    if(sessionStorage.getItem('jwt_token')) {
        this.userStatus = true;
    } else {
        this.userStatus = false;
    }

    this.itemsMenu = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            url: '/'
        },
        {
            label: 'Campaigns',
            icon: 'pi pi-fw pi-bookmark',
            url: '/admin/#/campaign'
        },
        {
            label: 'Subscribers',
            icon: 'pi pi-fw pi-user-plus',
            url: '/admin/#/subscriber'
        },
        // {
        //     label: 'Integrations',
        //     icon: 'pi pi-fw pi-cog',
        //     url: '/admin/#/integration',
        //     items: [
        //         {
        //             label: 'Edit',
        //             icon: 'pi pi-fw pi-pencil',
        //             items: [
        //                 {label: 'Save', icon: 'pi pi-fw pi-save'},
        //                 {label: 'Update', icon: 'pi pi-fw pi-save'},
        //             ]
        //         },
        //         {
        //             label: 'Other',
        //             icon: 'pi pi-fw pi-tags',
        //             items: [
        //                 {label: 'Delete', icon: 'pi pi-fw pi-minus'}
        //             ]
        //         }
        //     ]
        // }
    ];

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
