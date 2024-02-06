import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[setBackground]',
})
export class SetBackground implements OnInit {
  // @Input('setBackground') backColor: string = '#25454F';
  // @Input() textColor: string = 'white';

  @Input('setBackground') changeTextBackColor: {
    backColor: string;
    textColor: string;
  };

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.changeTextBackColor.backColor
    );
    this.renderer.setStyle(
      this.element.nativeElement,
      'color',
      this.changeTextBackColor.textColor
    );
  }
}
