import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ){

  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({body:this.authRequest}).subscribe(
      {
        next: () => {
          // todo save the token
          this.router.navigate(['home']);
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
