import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../../core/services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/services';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../../core/services/token/token.service';
import { SvgIconComponent } from "../../../shared/svg-icon/svg-icon.component";
import { navigateTo } from '../../../core/services/commun_fn/Navigation_fn';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    SvgIconComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];
  currentUrl: string = '';

  constructor(
    private routeTrackerService: RouteTrackerService,
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
  ){

  }
  
   ngOnInit(): void {
      this.routeTrackerService.currentUrl$.subscribe((url) => {
        this.currentUrl = url;
      });
  
    }

  loginWithProvider() {
    throw new Error('Method not implemented.');
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({body:this.authRequest}).subscribe(
      {
        next: (res) => {
          if (res && res.token) { // Ensure token exists
            this.tokenService.token = res.token; // Save the token
            this.router.navigate(['home']); // Navigate to the home page
            window.location.reload();

          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error);
          if(error.error.validationErrors){
            this.errorMsg = error.error.validationErrors;
          }
          else{
            this.errorMsg.push(error.error.error);
          }
          
        }
      }
    )

  }

  register(){
    navigateTo('register', this.currentUrl, this.router);
  }

}
