import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'life-cycle-hook';

  inputVal: string = '';
  doDestroy: boolean = false;
  constructor() {
    // console.log('APP Component Constructor Called');
  }

  onBtnClicked(inputEl: HTMLInputElement) {
    this.inputVal = inputEl.value;
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit in app component called');
  }

  destroyCompomnent() {
    this.doDestroy = !this.doDestroy;
  }
}
