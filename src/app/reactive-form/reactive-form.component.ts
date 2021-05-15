import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  registrationForm:FormGroup = new FormGroup({});
  submitted = false;
  form = {
    name: "Reactive Form",
    formElem: [
      {
        type: 'select',
        label: 'title',
        name: 'title',
        class: 'form-control',
        callback: '',
        option: ['mr.','mrs.','miss.'],
        required: true
      },
      {
        type: 'text',
        label: 'first name',
        name: 'firstName',
        class: 'form-control',
        callback: '',
        option: '',
        required: true
      },
      {
        type: 'text',
        label: 'last name',
        name: 'lastName',
        class: 'form-control',
        callback: '',
        option: '',
        required: true
      },
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
        type: 'password',
        label: 'confirm password',
        name: 'confirmPassword',
        class: 'form-control',
        callback: '',
        option: '',
        required: true
      },
      {
        type: 'date',
        label: 'DOB',
        name: 'dob',
        class: 'form-control',
        callback: '',
        option: '',
        required: true
      },
      {
        type: 'radio',
        label: 'gender',
        name: 'gender',
        class: 'mr-3 ml-2',
        callback: '',
        option: ['male','female','other'],
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

  constructor(private formBuilder: FormBuilder) { 
    // for(let i=0;i<this.formElem.length;i++){
    //   this.formElem[i].name = new FormControl('')
    // }
  }

  ngOnInit(): void {
    let formArray : any;
    // this.formElem.forEach(elem=>{
    //   var name1 = elem.name;
    //   this.registrationForm = this.formBuilder.group({
    //     firstName: new FormControl(''),
    //     name1: new FormControl(''),
    //   });
    //   console.log(formArray);
    // })
    
    this.registrationForm = this.formBuilder.group({
      title: ['',Validators.required],
      firstName: ['',[Validators.required, Validators.pattern('[A-Za-z]{3}')]],
      lastName: ['',[Validators.required, Validators.pattern('[A-Za-z]{3}')]],
      email: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      gender: ['',Validators.required],
      agree: [false,Validators.required]
    },{
      validator: this.mustMatch('password','confirmPassword')
    });
    
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.valid);
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }
}
