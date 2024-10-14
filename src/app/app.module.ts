import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { LmscalendarComponent } from './component/lmscalendar/lmscalendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { ApplyleaveComponent } from './component/applyleave/applyleave.component';
import { TimesheetComponent } from './component/timesheet/timesheet.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LeavehistoryComponent } from './component/leavehistory/leavehistory.component';

// import { LmsserviceService } from './services/lmsservice.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LmscalendarComponent,
    ApplyleaveComponent,
    TimesheetComponent,
    NavbarComponent,
    LeavehistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
