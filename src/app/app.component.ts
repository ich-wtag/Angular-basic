import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Template-driven-form';

  firstName: string = '';
  lastName: string = '';
  dob: string = '';
  emailAddress: string = '';
  userName: string = '';
  country: string = 'India';
  gender: string = 'male';
  IsAgreed: Boolean = false;

  @ViewChild('registrationForm') form!: NgForm;

  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer Not To Say' },
  ];

  OnFormSubmitted() {
    this.userName = this.form.value.userName;
    this.firstName = this.form.value.firstName;
    this.lastName = this.form.value.lastName;
    this.emailAddress = this.form.value.email;
    // this.country = this.form.value.address.country;
    this.dob = this.form.value.dob;
    // this.IsAgreed = this.form.value.address.agreement;

    this.form.reset();
    this.form.form.patchValue({
      gender: 'male',
      address: {
        country: 'India',
      },
    });
  }

  generateUserName() {
    let userName = '';

    if (this.firstName.length >= 3) {
      userName += this.firstName.slice(0, 3);
    } else {
      userName += this.firstName;
    }

    if (this.lastName.length >= 3) {
      userName += this.lastName.slice(0, 3);
    } else {
      userName += this.lastName;
    }

    let birthYear = new Date(this.dob).getFullYear();

    userName += birthYear;

    userName = userName.toLocaleLowerCase();

    console.log('userName', userName);

    // this.form.value.userName = userName;
    // this.form.setValue({
    //   firstName : ''
    // })

    this.form.form.patchValue({
      userName: userName,
      // address: {
      //   country: 'Japan',
      // },
    });
  }
}
