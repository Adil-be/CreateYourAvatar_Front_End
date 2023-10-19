import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginButtonComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [LoginButtonComponent],
})
export class LoginButtonModule {}
