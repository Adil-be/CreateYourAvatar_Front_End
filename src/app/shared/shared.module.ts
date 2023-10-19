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
import { NftOwnedComponent } from './components/nft-owned/nft-owned.component';
import { CollectionCardComponent } from './components/collection-card/collection-card.component';
import { ModelCardComponent } from './components/model-card/model-card.component';
import { GraphComponent } from './components/graph/graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    NftCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    TruncatePipe,
    InSalePipe,
    GlassBgDirective,
    NftOwnedComponent,
    CollectionCardComponent,
    ModelCardComponent,
    GraphComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxChartsModule, 
  ],
  exports: [
    NftCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    TruncatePipe,
    NftOwnedComponent,
    InSalePipe,
    CollectionCardComponent,
    ModelCardComponent,
    GraphComponent
  ],
})
export class SharedModule {}
