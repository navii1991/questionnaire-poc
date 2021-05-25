import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-build-form',
  templateUrl: './build-form.component.html',
  styleUrls: ['./build-form.component.scss']
})
export class BuildFormComponent implements OnInit {

  @Input() elem : any = {}
  @Input('form') registrationForm: any = {};
  @Input() submitted: boolean = false;
  @Input() f : any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
