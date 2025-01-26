import { Component, OnInit } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { DarkModeService } from './core/services/theme/dark-mode.service';
import { CommonModule } from '@angular/common';
import { TokenService } from './core/services/token/token.service';
import { TopBarComponent } from "./core/components/top-bar/top-bar.component";
import { LeftBarComponent } from "./core/components/left-bar/left-bar.component";
import { SvgIconRegistryService } from 'angular-svg-icon';

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
export class AppComponent implements OnInit {
  
  title = 'gamindie-ui';
  isAuthenticated : boolean = false;

  svg_names = ['home','edit','attach','bookmark','comment','delete',
    'dot-menu','google','heart','logo','logout','longLogo','menu',
    'search','setting','share','show','user','messanger','notification',
    'create','send','store','user-add','clock'
  ];

  constructor(
    private darkModeService: DarkModeService,
    private tokenService: TokenService,
    private iconReg: SvgIconRegistryService,
  ) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.tokenService.token ? true : false;
    this.darkModeService.loadTheme();
    this.svg_names.forEach(name => {
      this.iconReg.loadSvg(`Icons/${name}.svg`, name);
    });
  }

}
