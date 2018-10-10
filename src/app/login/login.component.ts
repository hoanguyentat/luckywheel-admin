import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorsService } from '../services/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  redirectUrl: string;
  loading = false;
  submitted = false;
  shopid: "";
  token = "";

  constructor(
    private fb: FormBuilder, 
    private authService: AuthenticationService, 
    private router: Router,
    private route: ActivatedRoute,
    private errService: ErrorsService) { 
    }

  ngOnInit() {
    this.loginForm = this.fb.group({
      token: ['', Validators.required]
    });
    this.authService.logout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
  }

  get fControll() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    let user = this.authService.login(this.fControll.token.value)
    if(user) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.errService.log("Can't login...");
      this.loading = false;
    }
  }
}
