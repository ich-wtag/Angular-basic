import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { TestComponent } from 'src/app/test/test.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {
  @ContentChild('para') paragarphEl: ElementRef;

  @ContentChild(TestComponent) testEl: TestComponent;

  @ContentChildren(TestComponent) testElements: QueryList<TestComponent>;

  @ContentChildren('para') paragarphElements: QueryList<ElementRef>;
  StyleParagraph() {
    // this.paragarphEl.nativeElement;
    // console.log(this.paragarphEl.nativeElement);

    // console.log(this.testEl.name);

    // this.paragarphElements.forEach((el) => console.log(el.nativeElement));

    this.testElements.forEach((el) => {
      console.log(el);
    });
  }
}
