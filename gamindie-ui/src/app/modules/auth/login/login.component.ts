import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../../core/services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/services';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../../core/services/token/token.service';
import { SvgIconComponent } from "../../../shared/svg-icon/svg-icon.component";


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
loginWithProvider() {
throw new Error('Method not implemented.');
}

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
  ){

  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({body:this.authRequest}).subscribe(
      {
        next: (res) => {
          if (res && res.token) { // Ensure token exists
            this.tokenService.token = res.token; // Save the token
            this.router.navigate(['home']); // Navigate to the home page
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
    this.router.navigate(['register']);
  }

}
