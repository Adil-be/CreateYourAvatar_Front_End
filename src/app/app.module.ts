import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { HomeComponent } from './pages/home/home.component';
import { ItemComponent } from './pages/item/item.component';
import { GaleryComponent } from './pages/galery/galery.component';
import { FooterModule } from './footer/footer.module';
import { HttpClientModule } from '@angular/common/http';
import { NftCardComponent } from './nft-card/nft-card.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RegistrationFormComponent } from './forms/registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ItemComponent, GaleryComponent, NftCardComponent, TruncatePipe, RegistrationComponent, RegistrationFormComponent, LoginComponent, LoginFormComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
