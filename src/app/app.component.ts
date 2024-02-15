import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reactive-form';

  reactiveForm: FormGroup = <FormGroup>{};
  formStatus: string = '';
  formData: any = {};

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      userName: new FormControl(''),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        CustomValidators.noSpaceAllowed,
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        CustomValidators.noSpaceAllowed,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        country: new FormControl('India'),
        city: new FormControl(''),
        region: new FormControl(''),
        postal: new FormControl('', Validators.required),
      }),
      skills: new FormArray([new FormControl('', Validators.required)]),

      experience: new FormArray([]),
    });

    // this.reactiveForm.get('firstName').valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.reactiveForm.valueChanges.subscribe((data) => {
    //   console.log(data);
    // });

    // this.reactiveForm.get('email').statusChanges.subscribe((status) => {
    //   console.log('stat', status);
    // });
    this.reactiveForm.statusChanges.subscribe((status) => {
      console.log(status);

      this.formStatus = status;
    });
  }

  onFormSubmitted() {
    console.log(this.reactiveForm.value);
    this.formData = this.reactiveForm.value;
    this.reactiveForm.reset({
      userName: null,
      firstName: null,
      lastName: null,
      email: null,
      dob: null,
      gender: 'male',
      address: {
        street: null,
        country: 'India',
        city: null,
        region: null,
        postal: null,
      },
      skills: [],

      experience: [],
    });
  }

  AddSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }

  DeleteSkill(index: number) {
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index);
  }

  AddExperience() {
    let formArray = <FormArray>this.reactiveForm.get?.('experience');
    const formGroup = new FormGroup({
      company: new FormControl(''),
      position: new FormControl(''),
      totalExp: new FormControl(''),
      start: new FormControl(null),
      end: new FormControl(null),
    });

    formArray.push(formGroup);
  }

  DeleteExperience(index: number) {
    const formArray = <FormArray>this.reactiveForm.get?.('experience');
    formArray.removeAt(index);
  }

  generateUserName() {
    let username = '';
    const fName: string = this.reactiveForm.get('firstName').value;
    const lName: string = this.reactiveForm.get('lastName').value;
    const dob: string = this.reactiveForm.get('dob').value;

    if (fName.length >= 3) {
      username += fName.slice(0, 3);
    } else {
      username += fName;
    }

    if (lName.length >= 3) {
      username += lName.slice(0, 3);
    } else {
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();
    // console.log(username);
    // this.reactiveForm.get('userName').setValue(username);

    this.reactiveForm.patchValue({
      userName: username,
      address: {
        city: 'Kalkata',
      },
    });
  }
}
