import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[disableProduct]',
})
export class DisableProductDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @Input() set disableProduct(disabled: Boolean) {
    if (disabled) {
      this.renderer.addClass(
        this.element.nativeElement,
        'disable-out-of-stock-product'
      );
    }
  }
}
