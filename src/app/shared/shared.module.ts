import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TruncatePipe } from './pipe/truncate.pipe';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './forms/registration-form/registration-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { InSalePipe } from './pipe/in-sale.pipe';
import { GlassBgDirective } from './directives/glass-bg.directive';
import { NftCardComponent } from './components/nft-card/nft-card.component';


@NgModule({
  declarations: [
    NftCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    TruncatePipe,
    InSalePipe,
    GlassBgDirective, 
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
