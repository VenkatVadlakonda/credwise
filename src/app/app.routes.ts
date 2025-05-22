import { Routes } from '@angular/router';
import { SigninComponent } from '../components/signin/signin.component';
import { SignupComponent } from '../components/signup/signup.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path:'',redirectTo:'/dashboard',pathMatch:'full'
  },
  {path:'signin',component:SigninComponent},
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'dashboard',component:DashboardComponent
  }
  
];
