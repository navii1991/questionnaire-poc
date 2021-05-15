import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() elem : any = {}
  @Input('form') registrationForm: any = {};
  @Input() submitted: boolean = false;
  @Input() f : any = {}

  constructor() { }

  ngOnInit(): void {
  }

}
