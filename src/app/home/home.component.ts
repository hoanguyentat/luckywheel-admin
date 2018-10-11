import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jwtToken: string;
  domain = environment.domain;
  constructor(private activedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('jwt_token')) {
      setTimeout(() => {
        // console.log("Redirecting to home page");
        window.location.replace(`/#/campaign`);
      }, 200);
    } else {
      this.jwtToken = this.activedRoute.snapshot.queryParams['token'];
      if(this.jwtToken) {
        sessionStorage.setItem('jwt_token', this.jwtToken);
        // console.log(this.jwtToken);
        window.location.replace('/#/campaign');
      } else {
        // console.log("Do not have a token");
      }
    }

  }

}
