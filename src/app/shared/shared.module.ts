import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftCardComponent } from './components/nft-card/nft-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TruncatePipe } from './pipe/truncate.pipe';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './forms/registration-form/registration-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';

@NgModule({
  declarations: [
    NftCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    NftCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    TruncatePipe,
  ],
})
export class SharedModule {}
