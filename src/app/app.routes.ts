import { Routes } from '@angular/router';
import { SigninComponent } from '../components/signin/signin.component';
import { SignupComponent } from '../components/signup/signup.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RepaymentsComponent } from '../components/repayments/repayments.component';
import { AdduserComponent } from '../components/adduser/adduser.component';
import { UserstatusComponent } from '../components/userstatus/userstatus.component';
import { UsermessageComponent } from '../components/usermessage/usermessage.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { DocumentsComponent } from '../components/documents/documents.component';
import { CreateloanComponent } from '../components/createloan/createloan.component';
import { LoantypeComponent } from '../components/loantype/loantype.component';

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
  },
  {
    path:'repayment',component:RepaymentsComponent
  },
  {
    path:'adduser',component:AdduserComponent
  },
  {
    path:'userstatus',component:UserstatusComponent
  },
  {
    path:'usermessage',component:UsermessageComponent
  },
  {
    path:'documents',component:DocumentsComponent
  },
  {
    path:'createloan',component:CreateloanComponent
  },
  {
    path:'loantype',component:LoantypeComponent
  },
  {
    path:'**',component:PagenotfoundComponent
  }
  
];
