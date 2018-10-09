import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorsService } from '../services/errors.service';
import { first } from 'rxjs/operators';

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
      this.shopid = this.route.snapshot.queryParams['shopid'] || "";
      this.token = this.route.snapshot.queryParams['token'] || ""; 
      if(this.shopid !== "" && this.token !== "") {
        localStorage.setItem("currentUser", JSON.stringify({"shopid": this.shopid, "token": this.token}));
        this.router.navigate['/'];
      }
    }

  ngOnInit() {
    this.loginForm = this.fb.group({
      shopid: ['', Validators.required],
      token: ['', Validators.required]
    });
    this.authService.logout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
  }

  get fControll() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    // this.authService.login(this.f.shopid.value, this.f.token.value)
    // .pipe(first())
    // .subscribe(
    //   data => {
    //       this.router.navigate([this.redirectUrl]);
    //   },
    //   error => {
    //       this.errService.log(error);
    //       this.loading = false;
    //   });
    let user = this.authService.login(this.fControll.shopid.value, this.fControll.token.value)
    if(user) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.errService.log("Can't login...");
      this.loading = false;
    }
  }
}
