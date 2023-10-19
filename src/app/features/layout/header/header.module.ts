import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDesktopComponent } from './menu-desktop/menu-desktop.component';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { HeaderComponent } from './header.component';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginButtonModule } from '../login-button/login-button.module';

@NgModule({
  declarations: [MenuDesktopComponent, MenuMobileComponent, HeaderComponent],

  imports: [CommonModule,RouterModule, SharedModule,LoginButtonModule],
  exports: [HeaderComponent],
  bootstrap: [HeaderComponent],
})
export class HeaderModule {

  
}
