import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule(({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AuthRoutingModule,
    SharedModule
  ]
}))

export class AuthModule {

}
