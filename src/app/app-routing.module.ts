import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';
import { LoginsComponent } from './logins/logins.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuestionsComponent } from './questions/questions.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent
  },
  {
    path: 'template-form',
    component: TemplateFormComponent
  },
  {
    path: 'logins',
    component: LoginsComponent
  },{
    path: 'gallery',
    component: ImgGalleryComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  { path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
