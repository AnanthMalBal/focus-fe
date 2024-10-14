import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LmscalendarComponent } from './component/lmscalendar/lmscalendar.component';
import { ApplyleaveComponent } from './component/applyleave/applyleave.component';
import { TimesheetComponent } from './component/timesheet/timesheet.component';
import { LeavehistoryComponent } from './component/leavehistory/leavehistory.component';
import { NavbarComponent } from './component/navbar/navbar.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'lmscalendar',component:LmscalendarComponent},
  {path:'applyleave',component:ApplyleaveComponent},
  {path:'timesheet',component:TimesheetComponent},
  {path:'leavehistory',component:LeavehistoryComponent},
  {path:'navbar',component:NavbarComponent},



   { path: '', redirectTo: 'lmscalendar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
