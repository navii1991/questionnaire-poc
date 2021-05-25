import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputComponent } from './input/input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginsComponent } from './logins/logins.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { BuildFormComponent } from './build-form/build-form.component';
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';
import { LazyLoadDirective } from './directive/lazy-load.directive';
import { ScrollDirective } from './directive/scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    HomePageComponent,
    ReactiveFormComponent,
    ErrorMsgComponent,
    InputComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LoginsComponent,
    TemplateFormComponent,
    BuildFormComponent,
    ImgGalleryComponent,
    LazyLoadDirective,
    ScrollDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1063054719053-0l5l7q9ia802l1oojf7ae3ai91afanmh.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('479505915784919')
          }
        ]
      } as SocialAuthServiceConfig,
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
