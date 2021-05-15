import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  
  step = 0;
  
  questions = [
    {
      type: 'icon',
      inputType: '',
      questionConfig: {
        topic: 'Platform',
        label: 'Mobile OS you want to target first?',
        options: [
          {name:'fa-apple', label:'iOS', subText:''},
          {name:'fa-android', label:'Android', subText:''},
          {name:'fa-globe', label:'Window', subText:''}
        ]
      }
    },
    {
      type: 'radio',
      inputType: 'radio',
      questionConfig: {
        topic: 'App',
        label: 'What kind of app is it going to be (offline/online)?',
        options: [
          {name:'app', label:'Offline and Static', subText:''},
          {name:'app', label:'Online and Dynamic', subText:''},
          {name:'app', label:'Both online and offline sync', subText:''},
          {name:'app', label:'Not sure what it is', subText:''}
        ]
      }
    },
    {
      type: 'icon',
      inputType: '',
      questionConfig: {
        topic: 'UI Type',
        label: 'What kind of UI do you prefer?',
        options: [
          {name:'fa-columns', label:'Basic UI/UX', subText:'(good for basic MVPs)'},
          {name:'fa-clone', label:'Custom UI', subText:'(When you want to stand out explicitly)'},
          {name:'fa-spinner', label:'Animation', subText:'(When it’s a game, kids, or simulation app)'}
        ]
      }
    },
    {
      type: 'radio',
      inputType: 'checkbox',
      questionConfig: {
        topic: 'User Registration',
        label: 'How you want user to sign-up?',
        options: [
          {name:'registration', label:'Phone OTP ', subText:'(on user’s mobile)'},
          {name:'registration', label:'Social Signup ', subText:'(FB, google, Twitter)'},
          {name:'registration', label:'Email Signup ', subText:'(Traditional)'},
          {name:'registration', label:'No Signup needed', subText:''}
        ]
      }
    }
  ]

  profileForm = new FormGroup({
    app: new FormControl(''),
    registration: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  toggleQuestion(n:number) {
    this.step = n;
  }

}
