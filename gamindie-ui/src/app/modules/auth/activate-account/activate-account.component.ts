import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CodeInputModule} from "angular-code-input"
import { Confirm$Params } from '../../../core/services/fn/authentication/confirm';

@Component({
  selector: 'app-activate-account',
  imports: [
    FormsModule,
    CommonModule,
    CodeInputModule,
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {


  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){

  }


  onCodeCompleted(token: string) {
    this.cofirmAccount(token);
  }

  cofirmAccount(token: string) {
    const params: Confirm$Params = { token };
    this.authService.confirm(params).subscribe(
      {
        next:() => {
          this.message = "Your account has been successfully activated. You can now login.";
          this.submitted = true;
          this.isOkay = true;
        },
        error: () => {
          this.message = "Token has been expired or invalid. Please try again.";
          this.isOkay = false;
          this.submitted = true;
        }
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
    
}
