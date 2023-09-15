import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/interface/user';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {
  constructor(private auth: AuthService) {
    this.user = this.auth.getAuthUser();
  }
  user: User | null = null;

  isLogged: boolean = false;

  ngOnInit() {
    // this.auth.getCurrentUser()?.subscribe((user) => {
    //   this.user = user;
    //   this.isLogged = true;
    // });
  }

  public logout() {
    this.auth.logout();
  }
}
