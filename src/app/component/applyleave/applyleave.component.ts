import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveModel } from 'src/app/modals/leavemodel';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { LeaveService } from 'src/app/services/leave.service';
import { LmsserviceService } from 'src/app/services/lmsservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})
export class ApplyleaveComponent {

  leavedata:any;
  leaveform!:FormGroup;
  loginData:any;
  newdata:any;
  addleavemessage:any;
  leavebal:any;
  from:any='';
  to:any='';
  noDays:any='';
  capturedValue:any;
  daysdiff:any='';
  minDate: string = '';
  maxDate: string = '';
  count:any;
  description:any;


  constructor(
    private leaveservice:LeaveService,
    private fb:FormBuilder,
    private authservice:AuthserviceService,
    private lmsservice:LmsserviceService,
    private router:Router
  ){
     authservice.apiData$.subscribe(data => this.loginData = data)
    }

  ngOnInit(): void {
    this.getLeave();
    this.leavebalance();


    // this.noDays= Math.floor((Date.UTC(this.to.getFullYear(), this.to.getMonth(), this.to.getDate()) - Date.UTC(this.from.getFullYear(), this.from.getMonth(), this.from.getDate()) ) /(1000 * 60 * 60 * 24));
    // console.log('noofdays',this.noDays);

    this.leaveform= this.fb.group({
      symbol: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      noOfDays: ['', [Validators.required]]

    })
    console.log("data",this.loginData)
    console.log("datid",this.loginData.Empid)
    console.log("datid",this.leaveform.value)

    const currentDate = new Date();
    this.from=this.formatDate(currentDate);
    this.minDate = this.formatDate(currentDate);
    this.maxDate = this.formatDate(currentDate);   
  }

  formatDate(date: Date): string {
    // Format date as yyyy-MM-dd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onLeaveTypeChange(): void {
    console.log("leavetypeevent")
    const leavetype=this.leaveform.get('symbol')?.value;
    const selectedLeaveType = this.leavedata.find(
      (leave:any) => leave.leaveTypeId ===leavetype
    );

    if (selectedLeaveType) {
      const maxDays = selectedLeaveType.maxDays;
      console.log("+++(selectedLeaveType++")
      // Calculate max date based on maxDays
      const currentDate = new Date();
      const maxDate = new Date(currentDate);
      maxDate.setDate(currentDate.getDate() + maxDays);

      // Update min and max dates
      this.minDate = this.formatDate(currentDate);
      this.maxDate = this.formatDate(maxDate);
      console.log("+++(selectedLeaveType++",this.minDate,this.maxDate)


    }
  }

  updateNoOfDays(daysdiff: number) {
    this.leaveform.patchValue({
      noOfDays: daysdiff
    });
  }

  sumbitLeave(){
    console.log("form",this.leaveform.value)

    const leaveformData = this.leaveform.value;
    var from=leaveformData.fromDate.split('T');
     var to=leaveformData.toDate.split('T');
    console.log('dates',from[0],to[0],from,to);
    this.newdata= new LeaveModel();
    this.newdata.fromDate=from[0];
    this.newdata.toDate=to[0];
    this.newdata.symbol=leaveformData.symbol
    this.newdata.reason=leaveformData.reason;

    this.leaveservice.addleave(this.newdata)
    .subscribe((res)=>{
      this.addleavemessage=res
      console.log(this.addleavemessage);
      Swal.fire({
        text:
        this.addleavemessage.message,
      });
    })
  }

  getLeave(){
    this.leaveservice.getLeaveType()
    .subscribe((result)=>{
      this.leavedata=result
      console.log("leavedata",this.leavedata)

    })
  }

  onInputChange() {
    console.log("diff of days");
    const fdate = new Date( this.leaveform.get('fromDate')?.value);
    const tdate = new Date( this.leaveform.get('toDate')?.value);
    console.log("diff of days====",fdate,tdate);
    const timeDifference = tdate.getTime() - fdate.getTime();
    this.daysdiff = timeDifference / (1000 * 3600 * 24);
    console.log("diff of days==",this.daysdiff);

  }

  leavebalance(){
    this.lmsservice.getleavebalance().subscribe(data=>{
      this.leavebal=data
      console.log("leavebal",this.leavebal);
      this.count=this.leavebal.Count;
      this.description=this.leavebal.Description;

    })
  }

  leavehistory(){
    this.router.navigate(["leavehistory"])
  }
}
