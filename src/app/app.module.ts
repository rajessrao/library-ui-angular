import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotpwdComponent } from './components/forgotpwd/forgotpwd.component';
import { LibraryComponent } from './components/library/library.component';
import { DetailsComponent } from './components/details/details.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { BookService } from './services/book.service';
import { UserService } from './services/user.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BookNewComponent } from './components/book-new/book-new.component';
import { BookListComponent } from './components/book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SigninComponent,
    ForgotpwdComponent,
    LibraryComponent,
    DetailsComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    BookNewComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, AuthGuard, BookService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
