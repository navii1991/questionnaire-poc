import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() elem2 : any = {}
  @Input('form') registrationForm: any = {};
  // @Input() submitted: boolean = false;
  // @Input() f : any = {}
  @Input() x : any = '';
  @Input() isReactive : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
