import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderModule } from './features/layout/header/header.module';
import { FooterModule } from './features/layout/footer/footer.module';
import { LoginModule } from './features/pages/login/login.module';
import { RegistrationModule } from './features/pages/registration/registration.module';
import { GaleryModule } from './features/pages/galery/galery.module';
import { ItemModule } from './features/pages/item/item.module';
import { AccountModule } from './features/account/account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './core/interceptors/TokenInterceptor';
import { HomeModule } from './features/pages/home/home.module';
import { NftCollectionModule } from './features/pages/nft-collection/nft-collection.module';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { LoginButtonModule } from './features/layout/login-button/login-button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
    LoginModule,
    RegistrationModule,
    GaleryModule,
    HomeModule,
    ItemModule,
    AccountModule,
    BrowserAnimationsModule,
    NftCollectionModule,
    MaterialModule,
    FormsModule,
    LoginButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
