import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent implements OnChanges {

  @Input() public name?: string;
  @Input() class = '';
  
  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    ) {
  }

  public ngOnChanges(): void {
    if (!this.name) {
      this.svgIcon = '';
      return;
    }
    this.httpClient
      .get(`/Icons/${this.name}.svg`, { responseType: 'text' })
      .subscribe({
        next: value => {
          this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
        },
        error: err => {
          console.error(`Error loading SVG: ${err}`);
          this.svgIcon = '';
        }
      });
  }

}