import { Component } from '@angular/core';
import { IDeactivaComponent } from '../Services/authguard.sewrvice';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements IDeactivaComponent {
  firstName: string = '';
  lastName: string = '';
  country: string = 'usa';
  message: string = '';

  isSubmitted: boolean = false;

  OnSubmit() {
    this.isSubmitted = true;
  }

  canExit() {
    if (
      (this.firstName || this.lastName || this.message) &&
      !this.isSubmitted
    ) {
      return confirm('You have unsaved changes. Do you want to move Away?');
    }
    return true;
  }
}
