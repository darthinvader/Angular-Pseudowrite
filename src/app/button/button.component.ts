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
  @Input() twClasses = '';
  @Input() otherAttrs: { [key: string]: any } = {}; // Object for all other attributes
}
