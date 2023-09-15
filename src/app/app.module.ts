import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { HeaderModule } from './features/layout/header/header.module';
import { FooterModule } from './features/layout/footer/footer.module';
import { LoginModule } from './features/pages/login/login.module';
import { RegistrationModule } from './features/pages/registration/registration.module';
import { GaleryModule } from './features/pages/galery/galery.module';
import { ItemModule } from './features/pages/item/item.module';
import { AccountModule } from './features/account/account.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
    LoginModule,
    RegistrationModule,
    GaleryModule,
    ItemModule,
    AccountModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
