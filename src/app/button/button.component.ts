import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TransferAttributesDirective } from '../../services/transfer-attributes.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [TransferAttributesDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() class = '';
  @Input() otherAttrs: { [key: string]: any } = {}; // Object for all other attributes

  getClasses() {
    return 'text-md px-6 py-2 bg-button text-primary rounded-lg shadow hover:bg-button-hover hover:text-primary-hover active:bg-button-active active:text-primary-active focus:outline-none transition ease-in-out duration-300' + this.class;
  }
}
