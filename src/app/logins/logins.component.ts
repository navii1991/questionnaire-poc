import { Component, OnInit } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {
  
  signInTitle: string = 'Sign in';
  btnDisabled = false;
  socialUser: SocialUser = {
    provider: '',
    id: '',
    email: '',
    name: '',
    photoUrl: '',
    firstName: '',
    lastName: '',
    authToken: '',
    idToken: '',
    authorizationCode: '',
    response: {}
};
  isLoggedin: boolean = false;
  loggedInDetails = false;
  
  form = {
    name: "Reactive Form",
    formElem: [
      {
        type: 'email',
        label: 'email',
        name: 'email',
        class: 'form-control',
        callback: '',
        option: '',
        required: true
      },
      {
        type: 'password',
        label: 'password',
        name: 'password',
        class: 'form-control',
        callback: '',
        option: '',
        required: true
      },
      {
        type: 'checkbox',
        label: 'Accept Terms & Conditions',
        name: 'agree',
        class: 'mt-3 ml-3',
        callback: '',
        option: '',
        required: true
      }
    ],
    formButton: {
      name: 'submit',
      class: 'form-control btn btn-success btn-lg mt-5',
      type: 'submit'
    }
  }

  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      this.loggedInDetails = true;
      console.log(this.socialUser);
    });
  }

  //get f() { return this.loginForm.controls; }

  signIn(formData:any, isFormValid:boolean|null) {
    this.isLoggedin = true;
    if(isFormValid) {
      this.loggedInDetails = true;
      this.signInTitle = 'Sign in using Email';
      this.socialUser.name = formData.email;
      this.socialUser.email = formData.email;
      this.socialUser.photoUrl = 'https://via.placeholder.com/90';
      console.log(formData);
      console.log(isFormValid);
    }    
  }
  
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      this.signInTitle = 'Sign in using Facebook';
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } else if (socialPlatform === 'google') {
      //socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.signInTitle = 'Sign in using Google';
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    // this.socialAuthService.signIn(socialPlatformProvider).then(
    //   (userData:any) => {
    //     console.log(socialPlatform + ' sign in data : ' , userData);
    //     // Now sign-in with userData
    //   }
    // );
  }

  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signInWithFB(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  logOut(): void {
    this.isLoggedin = false;
    this.loggedInDetails = false;
    this.socialAuthService.signOut(); 
  }

}
