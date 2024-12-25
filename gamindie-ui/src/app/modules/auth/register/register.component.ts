import { Component } from '@angular/core';
import { RegistrationRequest } from '../../../core/services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/services';
import { SvgIconComponent } from "../../../shared/svg-icon/svg-icon.component";

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    CommonModule,
    SvgIconComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
loginWithProvider() {
throw new Error('Method not implemented.');
}

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
