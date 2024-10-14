import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent {

  workdata: any;
  depdata: any;
  projectdata: any;
  timesheetform!: FormGroup;
  sentDate: any
  empData: any;
  signindata: any;
  selectedBillType: string = '';
  dailylogData: any = [];
  timesheetid: any;
  totalActualTime: any;
  workingMin: any;
  buttonenable: boolean = false;

  constructor(private timesheetservice: TimesheetService,
    private fb: FormBuilder,
    private homeRoute: ActivatedRoute,
    private authservice: AuthserviceService,
    private router: Router

  ) { authservice.apiData$.subscribe(data => this.empData = data) }

  ngOnInit(): void {

    this.homeRoute.params.subscribe((params: Params) =>
      this.sentDate = params[('date')],);
    console.log('getdate', this.sentDate)

    this.getsignin();
    this.workfor();
    this.departmentfor();
    this.projectfor();

    this.timesheetform = this.fb.group({
      projectId: ['', Validators.required],
      processId: ['', Validators.required],
      timesheetId: ['', Validators.required],
      actualTime: ['', Validators.required],
      description: ['', Validators.required],
      billType:['', Validators.required],

    })
  }

  onProcessChange(): void {
    const processId = this.timesheetform.get('processId')?.value;
    const selectedProcess = this.depdata.find((dept: any) => dept.processId === processId);
    this.selectedBillType = selectedProcess ? selectedProcess.billType : '';
  }

  submitTimesheet() {
    console.log(this.timesheetform.value);
    this.timesheetservice.addTimesheet(this.timesheetform.value)
      .subscribe((result: any) => {
        console.log(result)
      })
    this.getDailylog(this.timesheetid);
  }

  workfor() {
    this.timesheetservice.getwork().subscribe(data => {
      this.workdata = data
      console.log("work", this.workdata)
    })
  }

  departmentfor() {
    this.timesheetservice.getdepartmwnt().subscribe(data => {
      this.depdata = data
      console.log("dep", this.depdata)
    })
  }

  getsignin() {
    this.timesheetservice.getSignDate(this.empData.Empid, this.sentDate)
      .subscribe((res) => {
        this.signindata = res.result[0];
        this.workingMin = this.signindata.WorkingHours * 60;
        console.log("signindata", this.signindata);
        console.log("signindata1", this.signindata.markedTime)

      })
  }

  projectfor() {
    this.timesheetservice.getproject(this.sentDate).subscribe(data => {
      this.projectdata = data;
      this.timesheetid = this.projectdata[0].timesheetId;
      console.log("timesheet", this.projectdata);
      console.log("timesheetid", this.timesheetid);

      this.getDailylog(this.timesheetid)
    })
  }

  getDailylog(timeId: any) {
    this.timesheetservice.getuserdailylog(timeId)
      .subscribe((res) => {
        this.dailylogData = res;
        console.log("dailylogdata", this.dailylogData);
        // for(i=0;i<)
        this.totalActualTime = this.dailylogData.reduce((sum: any, item: any) => sum + item.actualTime, 0);
        console.log("totaltime", this.totalActualTime, this.workingMin ,this.totalActualTime);
        if (this.totalActualTime >= this.workingMin) {
          console.log(" iam there", );
          this.buttonenable = true;
        }

      })

  }

  deletelog() {

  }




}
