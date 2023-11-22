import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';

const toolbarHiddenButtons = [
  [
    'subscript',
    'superscript',
  ],
  [
    'fontSize',
    'textColor',
    'backgroundColor',
    'customClasses',
    'link',
    'unlink',
    'insertImage',
    'insertVideo',
    'insertHorizontalRule',
    'toggleEditorMode'
  ]
]

const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'calc(100vh - 100px)',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Write Chapter Here...',
  defaultFontName: 'roboto',
  fonts: [
    { class: 'roboto', name: 'Roboto' },
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
  ],
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: toolbarHiddenButtons,
};
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AngularEditorModule, FormsModule, HttpClientModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent {
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