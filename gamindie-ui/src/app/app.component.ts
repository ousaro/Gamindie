import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './core/services/theme/dark-mode.service';
import { CommonModule } from '@angular/common';
import { TokenService } from './core/services/token/token.service';
import { TopBarComponent } from "./core/components/top-bar/top-bar.component";
import { LeftBarComponent } from "./core/components/left-bar/left-bar.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    TopBarComponent,
    LeftBarComponent
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
