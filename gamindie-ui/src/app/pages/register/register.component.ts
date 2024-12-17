import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  imports:[
      FormsModule,
      CommonModule,
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
     private router: Router,
    private authService: AuthenticationService,
  ){
    
  }

  register() {
    this.errorMsg = [];
    this.authService.register({body: this.registerRequest}).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (error) => {
        this.errorMsg = error.error.validationErrors;
      }
    })
  }
  
  login() {
    this.router.navigate(['login']);
  }


}
