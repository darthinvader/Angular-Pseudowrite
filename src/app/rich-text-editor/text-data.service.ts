import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {
  private _textContent: string = '';

  constructor() { }

  get textContent(): string {
    return this._textContent;
  }

  set textContent(value: string) {
    this._textContent = value;
  }
}