import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ResponseRegistration } from 'src/app/core/interface/ResponseRegistration';
import { UserLogin } from 'src/app/core/interface/UserLogin';
import { User } from 'src/app/core/interface/model/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  public constructor(private auth: AuthService) {}

  public response: ResponseRegistration | null = null;

  public loading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  public onSubmit() {
    this.loading = true;
    this.loginForm.value.email;
    let user: UserLogin = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.auth.login(user);
  }
}
