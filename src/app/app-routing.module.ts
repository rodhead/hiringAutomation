import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CandidateComponent } from './candidate/candidate.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent},
  {path: 'candidate', component:CandidateComponent},
  {path:'adminConsole', component:AdminConsoleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
