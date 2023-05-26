import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { Page404Component } from './page404/page404.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'people-list',
    component:PeopleListComponent,
  },
  {
    path:'update-user/:id',
    component:UpdateUserComponent,
  },
  {
    path:'add-user',
    component:AddUserComponent,
  },
  {
    path:'**',
    component:Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
