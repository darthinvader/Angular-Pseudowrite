import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[transferAttributes]',
  standalone: true
})
export class TransferAttributesDirective implements OnInit {
  @Input() transferAttributes: { [key: string]: any } = {};

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    Object.keys(this.transferAttributes).forEach(key => {
      if (key.startsWith('on')) { // For event listeners
        const eventType = key.slice(2).toLowerCase();
        this.renderer.listen(this.el.nativeElement, eventType, this.transferAttributes[key]);
      } else { // For attributes
        this.renderer.setAttribute(this.el.nativeElement, key, this.transferAttributes[key]);
      }
    });
  }
}
