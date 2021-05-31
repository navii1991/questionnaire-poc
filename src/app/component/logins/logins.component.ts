import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {
  
  signInTitle: string = 'Sign in';
  isLoggedin: boolean = false;
  
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

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.authenticated$.subscribe((authorized: boolean)=>{
      authorized ? this.router.navigateByUrl('/user') : '';
    }) 
  }

  ngOnInit(): void {}


  signIn(formData:any, isFormValid:boolean|null) {
    this.isLoggedin = true;
    if(isFormValid) {
      this.authService.login(formData.email,formData.password, 'E');
    }    
  }
  
  socialSignIn(socialPlatform: string) {
    this.authService.login('','',socialPlatform);
  }

}
