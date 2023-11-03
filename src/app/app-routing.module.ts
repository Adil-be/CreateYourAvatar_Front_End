import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { ItemComponent } from './features/pages/item/item.component';
import { RegistrationComponent } from './features/pages/registration/registration.component';
import { authGuard } from './core/guards/auth.guard';
import { IndexComponent } from './features/pages/nft-collection/index/index.component';

const routes: Routes = [
  { path: 'nftCollection', component: IndexComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'galery',
    loadChildren: () =>
      import('./features/pages/galery/galery.module').then(
        (m) => m.GaleryModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./features/account/account.module').then((m) => m.AccountModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
