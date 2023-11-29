import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-generator-area',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './generator-area.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorAreaComponent {
  
}
