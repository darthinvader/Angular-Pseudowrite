import { Component } from '@angular/core';
import { TextEditorService } from './text-data.service';
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent {
  constructor(public textEditorService: TextEditorService) { }

  handleTextChange(): void {
    console.log(this.textEditorService.textContent);
  }
}
