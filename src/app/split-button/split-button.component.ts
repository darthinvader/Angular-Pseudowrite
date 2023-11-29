import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-split-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './split-button.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitButtonComponent {
  @Input() onClick?: Function;

  dropdownOpen = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
