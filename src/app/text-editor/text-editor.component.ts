import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { editorConfig } from './editorDefaults';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AngularEditorModule, FormsModule, HttpClientModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TextEditorComponent {
  @Input() htmlContent = ''
  @Input() editorConfig = editorConfig
  @Output() htmlContentChange = new EventEmitter();

  constructor(private http: HttpClient) { }

  saveContent() {
    // Emitting the current htmlContent
    this.htmlContentChange.emit(this.htmlContent);
  }

  performRequest() {
    const url = 'http://localhost:1234/v1/chat/completions';

    if (window.getSelection) {
      let selection = window.getSelection();
      const body = {
        messages: [
          { role: 'system', content: 'Always answer in rhymes.' },
          { role: 'user', content: selection?.toString() }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      };
      return this.http.post(url, body, { headers: { 'Content-Type': 'application/json' } }).subscribe((object => console.log(object)));
    }
    return null
  }
  giveDifferentWording() {
    const url = 'http://localhost:1234/v1/chat/completions';

    if (window.getSelection) {
      let selection = window.getSelection();
      const body = {
        messages: [
          { role: 'system', content: 'Reword the specific message, do not say anything before or after the rewording.' },
          { role: 'user', content: selection?.toString() }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      };
      return this.http.post(url, body, { headers: { 'Content-Type': 'application/json' } }).subscribe((object => console.log(object)));
    }
    return null
  }
}