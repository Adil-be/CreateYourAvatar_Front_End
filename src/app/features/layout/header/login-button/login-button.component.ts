import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/interface/user';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService,
    private auth: AuthService
  ) {}
  user: User | null = null;

  isLogged: boolean = false;

  ngOnInit() {
    this.localStorage.user$.subscribe((user) => {
      this.user = user;
      console.log('user ', user);
    });
  }

  public logout() {
    this.auth.logout();
  }
}
