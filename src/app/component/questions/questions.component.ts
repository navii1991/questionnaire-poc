import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Platform, Question, Registration, UI } from 'src/app/model/question.interface';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  
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
      formGroupName: 'app',
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
      formGroupName: 'ui',
      questionConfig: {
        topic: 'UI Type',
        label: 'What kind of UI do you prefer?',
        options: [
          {name:'fa-columns', label:'Basic UI/UX', subText:'(good for basic MVPs)',controlName:'basic'},
          {name:'fa-clone', label:'Custom UI', subText:'(When you want to stand out explicitly)',controlName:'custom'},
          {name:'fa-spinner', label:'Animation', subText:'(When it’s a game, kids, or simulation app)',controlName:'animated'}
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

  step = 0;

  appPlatform: string[] = []
  questionAnswered: Question | any;

  profileForm = new FormGroup({});
  moveToNextQuestion: boolean = true;
  showError: boolean = false;
  moveToNext : string[] = [];

  constructor(private fb: FormBuilder) {
    this.questionAnswered = {
      platform:<Platform> {
        ios: false,
        android: false,
        window: false
      },
      app: "",
      ui:<UI> {
        basic: false,
        custom: false,
        animated: false
      },
      registration:<Registration> {
        otp: false,
        social: false,
        email: false,
        noSignup: false
      }
    }

    this.profileForm = this.fb.group({
      platform:  new FormGroup({
        ios: new FormControl(false),
        android: new FormControl(false),
        window: new FormControl(false)
      }),
      app: ['',[Validators.required]],
      ui: new FormGroup({
        basic: new FormControl(false),
        custom: new FormControl(false),
        animated: new FormControl(false)
      }),
      registration: new FormGroup({
        otp: new FormControl(false),
        social: new FormControl(false),
        email: new FormControl(false),
        noSignup: new FormControl(false)
      }),
    });
   }

  ngOnInit(): void {}
  
  get f() { return this.profileForm.controls; }

  selectIcon(e:any,iconName: string,topic:string,index:number): void {
    e.currentTarget.classList.toggle('active');
    iconName=='ios' ? this.questionAnswered.platform.ios = !this.questionAnswered.platform.ios : '';
    iconName=='android' ? this.questionAnswered.platform.android = !this.questionAnswered.platform.android : '';
    iconName=='window' ? this.questionAnswered.platform.window = !this.questionAnswered.platform.window : '';
    iconName=='basic' ? this.questionAnswered.ui.basic = !this.questionAnswered.ui.basic : '';
    iconName=='custom' ? this.questionAnswered.ui.custom = !this.questionAnswered.ui.custom : '';
    iconName=='animated' ? this.questionAnswered.ui.animated = !this.questionAnswered.ui.animated : '';
    
    this.profileForm.patchValue({
      platform: {
        ios: this.questionAnswered.platform.ios,
        android: this.questionAnswered.platform.android,
        window: this.questionAnswered.platform.window,
      },
      ui: {
        basic: this.questionAnswered.ui.basic,
        custom: this.questionAnswered.ui.custom,
        animated: this.questionAnswered.ui.animated
      },
      registration: {
        otp: this.questionAnswered.registration.otp,
        social: this.questionAnswered.registration.social,
        email: this.questionAnswered.registration.email,
        noSignup: this.questionAnswered.registration.noSignup
      }
    });
    
    this.moveToNextValidation(e,index,topic);
    
  }

  moveToNextValidation(e:any,index:number, topic:string) {
    console.log(e.currentTarget.checked)
    if(index == 0)
      (this.questionAnswered.platform.ios || this.questionAnswered.platform.android || this.questionAnswered.platform.window) ? this.moveToNext.push(`next${index}`) : this.moveToNext = this.moveToNext.filter((value) =>{ return value != `next${index}`;});
    if(index ==1)
      (e.currentTarget.checked) ? this.moveToNext.push(`next${index}`) : this.moveToNext = this.moveToNext.filter((value) =>{ return value != `next${index}`;});
    if(index == 2)
      (this.questionAnswered.ui.basic || this.questionAnswered.ui.custom || this.questionAnswered.ui.animated) ? this.moveToNext.push(`next${index}`) : this.moveToNext = this.moveToNext.filter((value) =>{ return value != `next${index}`;});
    if(index == 3)
      (this.questionAnswered.registration.otp || this.questionAnswered.registration.social || this.questionAnswered.registration.email || this.questionAnswered.registration.noSignup) ? this.moveToNext.push(`next${index}`) : this.moveToNext = this.moveToNext.filter((value) =>{ return value != `next${index}`;});
  }

  toggleQuestion(n:number, direction:string) {
    console.log(this.profileForm.controls.app);  
   // this.moveToNextValidation(n-1, '');
    if(direction == 'forward') { 
      this.moveToNext.includes(`next${n-1}`) ? this.moveToNextQuestion = true : this.moveToNextQuestion = false;
 
      if(this.moveToNextQuestion) {
        this.step = n;
        this.moveToNextQuestion = false;
        this.showError = false;
      } else {
        this.showError = true;
      }
    } else {
      this.step = n;
    }
  }

  getActiveClass(formGroup:string , formControl:string): boolean {
     let json = this.questionAnswered[formGroup][formControl];
     console.log(json);
    return json;
  }

}
