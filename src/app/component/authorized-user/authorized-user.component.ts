import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-authorized-user',
  templateUrl: './authorized-user.component.html',
  styleUrls: ['./authorized-user.component.scss']
})
export class AuthorizedUserComponent implements OnInit {
  signInTitle = 'Logged in '
  currentUser: SocialUser = {
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
  
storage: Storage = window.localStorage;

  constructor(private authService: AuthService, private router: Router) { 
    const userData = this.storage.getItem('currentUser');
    if(userData) {
     this.authService.socialUser = JSON.parse(userData);
    }
    this.authService.socialUser$.subscribe((user: SocialUser)=>{
      this.currentUser = user;
    })
    this.authService.authenticated$.subscribe((authorized: boolean)=>{
      !authorized ? this.router.navigateByUrl('/logins') : '';
    }) 
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout();
  }

}
