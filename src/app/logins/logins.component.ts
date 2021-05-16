import { Component, OnInit } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {
  
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

  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }

  signIn(formData:object, isFormValid:boolean|null) {
    this.isLoggedin = true;
    console.log(formData);
    console.log(isFormValid);
  }
  
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } else if (socialPlatform === 'google') {
      //socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
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
    this.socialAuthService.signOut();
    this.isLoggedin = false; 
  }

}
