import { Component } from '@angular/core';
import { RegistrationRequest } from '../../../core/services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/services';
import { SvgIconComponent } from "../../../shared/svg-icon/svg-icon.component";
import { navigateTo } from '../../../core/services/commun_fn/Navigation_fn';
import { RouteTrackerService } from '../../../core/services/routeTracker/route-tracker.service';

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

  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];
  currentUrl: string = '';


  constructor(
     private routeTrackerService: RouteTrackerService,
     private router: Router,
    private authService: AuthenticationService,
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
    navigateTo('login', this.currentUrl, this.router);
  }


}
