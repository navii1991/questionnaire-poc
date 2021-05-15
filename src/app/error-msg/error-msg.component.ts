import { Component, Input, OnInit } from '@angular/core';
import { FormControl, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {

  @Input() ctrl: any = new FormControl;

  @Input() name: string = "";

  @Input() submitted: boolean = false;


  ERROR_MESSAGE: any = {
    required: (par?:any, name?:string) => `${name} is required`,
    minlength: (par?:any,name?:string) => `Min ${par.requiredLength} chars is required`,
    mustMatch: (par?:any,name?:string) => `Confirm password must match`,
    pattern: (par?:any, name?:string) =>  `${name} is not valid`,
   // email: (par?:any, name?:string) =>  `${name} is not valid`
  };

  constructor() { 
    //this.ctrl = new FormControl();
  }

  ngOnInit() { }

  shouldShowErrors(): boolean | null {
    return this.submitted || this.ctrl && this.ctrl.errors && this.ctrl.touched;
  }

  listOfErrors(): string[] {
    // return Object.keys(this.ctrl.errors).map(
    //   err => this.ERROR_MESSAGE[err](this.ctrl.getError(err))
    // );
    let name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    let msgArr = [];
    for (const item in this.ctrl.errors) {
      console.log(item);
      msgArr.push(this.ERROR_MESSAGE[item](this.ctrl.getError(item),name));

    }
    return msgArr;
  }

}
