import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { ItemComponent } from './features/pages/item/item.component';
import { RegistrationComponent } from './features/pages/registration/registration.component';
import { LoginComponent } from './features/pages/login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },

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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
