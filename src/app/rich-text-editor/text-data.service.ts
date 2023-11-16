import { Injectable, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TextEditorService {
  private _htmlContent: string = '';

  constructor(private sanitizer: DomSanitizer) { }

  get textContent(): string {
    return this._htmlContent;
  }

  set textContent(value: string) {
    this._htmlContent = value;
    console.log(this._htmlContent)
  }

  get safeHtmlContent() {
    return this.sanitizer.bypassSecurityTrustHtml(this._htmlContent);
  }
}
