import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  
  step = 0;

  appPlatform: string[] = []
  questionAnswered: {
    platform: {
      ios: boolean,
      android: boolean,
      window: boolean
    },
    app: string,
    ui: string[],
    registration: string
  };
  
  questions = [
    {
      type: 'icon',
      inputType: '',
      formGroupName: 'platform',
      questionConfig: {
        topic: 'Platform',
        label: 'Mobile OS you want to target first?',
        options: [
          {name:'fa-apple', label:'iOS', subText:'',controlName:'ios'},
          {name:'fa-android', label:'Android', subText:'',controlName:'android'},
          {name:'fa-globe', label:'Window', subText:'',controlName:'window'}
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
          {name:'app', label:'Offline and Static', subText:'',controlName:''},
          {name:'app', label:'Online and Dynamic', subText:'',controlName:''},
          {name:'app', label:'Both online and offline sync', subText:'',controlName:''},
          {name:'app', label:'Not sure what it is', subText:'',controlName:''}
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
          {name:'fa-columns', label:'Basic UI/UX', subText:'(good for basic MVPs)',controlName:'ios1'},
          {name:'fa-clone', label:'Custom UI', subText:'(When you want to stand out explicitly)',controlName:'ios2'},
          {name:'fa-spinner', label:'Animation', subText:'(When it’s a game, kids, or simulation app)',controlName:'ios3'}
        ]
      }
    },
    {
      type: 'checkbox',
      inputType: 'checkbox',
      formGroupName: 'registration',
      questionConfig: {
        topic: 'User Registration',
        label: 'How you want user to sign-up?',
        options: [
          {name:'otp', label:'Phone OTP ', subText:'(on user’s mobile)',controlName:'otp'},
          {name:'social', label:'Social Signup ', subText:'(FB, google, Twitter)',controlName:'social'},
          {name:'email', label:'Email Signup ', subText:'(Traditional)',controlName:'email'},
          {name:'noSignup', label:'No Signup needed', subText:'',controlName:'noSignup'}
        ]
      }
    }
  ]

  profileForm = new FormGroup({});
  moveToNextQuestion: boolean = false;

  constructor(private fb: FormBuilder) {
    this.questionAnswered = {
      platform: {
        ios: false,
        android: false,
        window: false
      },
      app: "",
      ui: ['ss'],
      registration: "sdsdsd"
    }
   }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      platform:  new FormGroup({
        ios: new FormControl(''),
        android: new FormControl(''),
        window: new FormControl('')
      }),
      app: ['',[Validators.required]],
      ui: this.fb.array([
        this.fb.control('')
      ]),
      registration: new FormGroup({
        phone: new FormControl(false),
        social: new FormControl(false),
        email: new FormControl(false),
        noSignup: new FormControl(false)
      }),
    });
  }

  selectIcon(e:any,iconName: string,topic:string|undefined): void {
    e.target.classList.toggle('active');
    iconName=='ios' ? this.questionAnswered.platform.ios = !this.questionAnswered.platform.ios : '';
    iconName=='android' ? this.questionAnswered.platform.android = !this.questionAnswered.platform.android : '';
    iconName=='window' ? this.questionAnswered.platform.window = !this.questionAnswered.platform.window : '';
    //this.questionAnswered.platform.ios = !this.questionAnswered.platform.ios;
    this.profileForm.patchValue({
      platform: {
        ios: this.questionAnswered.platform.ios,
        android: this.questionAnswered.platform.android,
        window: this.questionAnswered.platform.window,
      }
    });
   //this.profileForm.patchValue({platform:['xxxxxx']});
    //console.log(this.profileForm.get('platform').setValue(['ss']));
  
    

  }

  toggleQuestion(n:number) {
    console.log(this.profileForm.valid)
    console.log(this.profileForm.value)
    //this.profileForm.controls.p
    this.moveToNextQuestion ? this.step = n : '';
  }

}
