import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedUserComponent } from './component/authorized-user/authorized-user.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ImgGalleryComponent } from './component/img-gallery/img-gallery.component';
import { LoginsComponent } from './component/logins/logins.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { QuestionsComponent } from './component/questions/questions.component';
import { ReactiveFormComponent } from './component/reactive-form/reactive-form.component';
import { TemplateFormComponent } from './component/template-form/template-form.component';
import { AuthGuard } from './directive/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    component: AuthorizedUserComponent,
    canActivate: [AuthGuard]
  },
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
    component: HomePageComponent,
    pathMatch: 'full'
  },
  { path: '**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
