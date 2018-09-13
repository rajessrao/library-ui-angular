import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { LibraryComponent } from './library/library.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'profile',    component: ProfileComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'signup',     component: SignupComponent },
  { path: 'signin',     component: SigninComponent },
  { path: 'forgotpwd',  component: ForgotpwdComponent },
  { path: 'library',    component: LibraryComponent },
  { path: 'details',    component: DetailsComponent },
  { path: 'landing',    component: LandingComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
