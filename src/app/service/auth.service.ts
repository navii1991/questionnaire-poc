import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _socialUser: SocialUser = {
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
  private _authenticated: boolean = false;
  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(this._authenticated);
  socialUser$:  BehaviorSubject<SocialUser> = new BehaviorSubject<SocialUser>(this._socialUser);
  
  set authenticated(value:boolean) {
    this._authenticated = value;
    this.authenticated$.next(this._authenticated);
  }
  get authenticated() {
    return this._authenticated;
  }

  set socialUser(value:SocialUser) {
    this._socialUser = value;
    this.socialUser$.next(this.socialUser);
  }

  get socialUser() {
    return this._socialUser;
  }
  
  socialLogin = false;

  constructor(private http: HttpClient, private socialAuthService: SocialAuthService) { 
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if(user != null) {
        this.socialLogin = true;
        this.authenticated = true;
        this.socialUser = user;
        localStorage.setItem('token', this.socialUser.authToken);
        localStorage.setItem('currentUser', JSON.stringify(this.socialUser));
      }
    });
    
    if(this.getToken()) {
      this.authenticated = true; //setter, publish the value
    }
  }
  
  getToken() {
    return localStorage.getItem('token'); 
  }

  login(username: string, password: string, loginType: string) {
    if (loginType === 'F') {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } else if (loginType === 'G') {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } else {
      // this.http.post(`${environment.authEndPoint}`, {username,password}).subscribe((data: any)=> {
      //   console.log('Data', data);
      //   localStorage.setItem('token', data.token)
      //   this.authenticated = true; //setter, publish the value true
      // });
      this.authenticated = true;
      const user: SocialUser = {
        provider: 'email',
        id: '54321',
        email: username,
        name: username,
        photoUrl: 'https://via.placeholder.com/90',
        firstName: 'John',
        lastName: 'Doe',
        authToken: '1/fFAGRNJru1FTz70BzhT3Zg',
        idToken: '',
        authorizationCode: '',
        response: {}
      };
      localStorage.setItem('token', user.authToken);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  logout() {
    localStorage.clear(); // clear tokren, cartItems all
    this.authenticated = false;
    this.socialLogin ? this.socialAuthService.signOut() : ''; 
  }
}
