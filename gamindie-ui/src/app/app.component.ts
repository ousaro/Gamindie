import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './core/services/theme/dark-mode.service';
import { CommonModule } from '@angular/common';
import { TokenService } from './core/services/token/token.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gamindie-ui';
  isAuthenticated : boolean = false;

  constructor(
    private darkModeService: DarkModeService,
    private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.tokenService.token ? true : false;
    this.darkModeService.loadTheme();
  }

}
