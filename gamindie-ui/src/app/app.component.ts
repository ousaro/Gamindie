import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './services/theme/dark-mode.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gamindie-ui';

  constructor(private darkModeService: DarkModeService) {
  }

  ngOnInit(): void {
    this.darkModeService.loadTheme();
  }

}
