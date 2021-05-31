import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  links = [
    {
      label: 'Reactive Form',
      link: 'reactive-form'
    },
    {
      label: 'Template Form',
      link: 'template-form'
    },
    {
      label: 'Questionnaire',
      link: 'questions'
    },
    {
      label: 'Social Logins',
      link: 'logins'
    },
    {
      label: 'Gallery',
      link: 'gallery'
    },
    {
      label: 'Logged in User',
      link: 'user'
    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
