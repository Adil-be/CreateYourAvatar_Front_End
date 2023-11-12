import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'd3';
import { Subscription, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ResponseRegistration } from 'src/app/core/interface/ResponseRegistration';
import { UserLogin } from 'src/app/core/interface/UserLogin';
import { User } from 'src/app/core/interface/model/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnDestroy {
  public constructor(private auth: AuthService, private router: Router) {}

  public response: ResponseRegistration | null = null;

  private subscription: Subscription | null = null;

  public error: string | null = null;

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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  public onSubmit() {
    this.loading = true;
    this.loginForm.value.email;
    let user: UserLogin = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.response = null;

    this.subscription = this.auth
      .login(user)
      .pipe(
        catchError((error) => {
          this.loading = false;
          this.response = { success: false, message: error.message };
          console.error('Erreur lors de la connexion:', error);
          return of(error);
        })
      )
      .subscribe((res) => {
        this.router.navigate(['/account']);
      });
  }
}
