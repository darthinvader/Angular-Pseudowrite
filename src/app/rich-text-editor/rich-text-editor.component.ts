import { Component } from '@angular/core';
import { TextEditorService } from './text-data.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],

  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
  ]
};

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css'],
})
export class RichTextEditorComponent {
  editorConfig = editorConfig


  constructor(public textEditorService: TextEditorService) { }

  handleTextChange(): void {
    console.log(this.textEditorService.textContent);
  }

  getSelectedText() {
    console.log(window)
    if (window.getSelection) {
      let selection = window.getSelection();
      console.log(selection.toString())
    }
    return '';
  }

}
