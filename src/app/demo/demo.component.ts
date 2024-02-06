import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  title: string = 'Demo Component';

  @Input() message!: string;

  @ViewChild('temp') tempPara!: ElementRef;
  @ContentChild('tempParent') paraElement!: ElementRef;

  constructor() {
    console.log('Component Constructor Called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ng Onchange hoook called');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ng on init called');
  }

  ngDoCheck() {
    console.log('ng do check is called');
  }

  ngAfterContentInit() {
    console.log('ng after Content Init called');
  }

  ngAfterContentChecked() {
    console.log('ng after Content Checked called');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }
  ngOnDestroy() {
    console.log('ng on destroy hook called');
  }
}
