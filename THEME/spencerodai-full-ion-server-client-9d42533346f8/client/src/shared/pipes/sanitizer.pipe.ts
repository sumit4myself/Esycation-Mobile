import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'sanitize' })
export class SanitizePipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }

  transform(value, args): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    if (value) {
      switch (args) {
        case 'url':
          return this.sanitized.bypassSecurityTrustUrl(value);
        case 'resource':
          return this.sanitized.bypassSecurityTrustResourceUrl(value);
        case 'script':
          return this.sanitized.bypassSecurityTrustScript(value);
        case 'style':
          return this.sanitized.bypassSecurityTrustStyle(value);
        case 'html':
          return this.sanitized.bypassSecurityTrustHtml(value);
        default:
          return value;
      }
    } else {
      return 'Nothing to Display';
    }
  }
};
