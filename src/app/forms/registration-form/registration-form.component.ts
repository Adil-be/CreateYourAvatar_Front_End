import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResponseRegistration } from 'src/app/interface/ResponseRegistration';
import { User } from 'src/app/interface/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  constructor(private fb: FormBuilder, private rs: RegistrationService) {}

  public response: ResponseRegistration | null = null;

  registrationForm = this.fb.group({
    identifier: this.fb.group({
      email: ['adil-b@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    }),
    optionals: this.fb.group({
      username: [''],
      firstname: [''],
      lastname: [''],
      birthday: [],
      gender: [''],
    }),
  });
  get email() {
    return this.registrationForm.get('identifier.email')!;
  }
  get password() {
    return this.registrationForm.get('identifier.password')!;
  }

  public onSubmit() {
    let user: User = this.constructUser();

    this.rs.registerUser(user).subscribe((response) => {
      this.response = response;
    });
  }

  public constructUser(): User {
    let user: User = {
      email: this.registrationForm.value.identifier!.email!,
      password: this.registrationForm.value.identifier!.password!,
    };

    if (this.registrationForm.value.optionals != null) {
      let optionals = this.registrationForm.value.optionals;

      let username = optionals.username;
      if (username != undefined && username !== null) {
        user.username = username;
      }
      let firstname = optionals.firstname;
      if (firstname !== undefined && firstname !== null) {
        user.firstname = firstname;
      }
      let lastname = optionals.lastname;
      if (lastname != undefined && lastname !== null) {
        user.lastname = lastname;
      }
      let gender = optionals.gender;
      if (gender != undefined && gender !== null) {
        user.gender = gender;
      }
      let birthday = optionals.birthday;
      if (birthday != undefined && birthday !== null) {
        user.birthday = birthday as Date;
      }
    }
    return user;
  }
}
