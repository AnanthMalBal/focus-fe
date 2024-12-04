import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, EventInput, EventSourceFuncArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { AuthserviceService } from 'src/app/services/authservice.service';
 import { LmsserviceService } from 'src/app/services/lmsservice.service';
import { MarkattendanceService } from 'src/app/services/markattendance.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lmscalendar',
  templateUrl: './lmscalendar.component.html',
  styleUrls: ['./lmscalendar.component.css']
})
export class LmscalendarComponent implements OnInit {

  empData:any;
  lmslist :any;
  leavebal: any;
  calenderItem:any = [];
  selectedToggle: string = '';
  mode="WFH";
  name:string="demo";


  constructor(
    private lmsservice: LmsserviceService,
    private authservice:AuthserviceService,
    private attendanceservice:MarkattendanceService,
    private router:Router
    ) {  authservice.apiData$.subscribe(data => this.empData = data)}

  ngOnInit(): void {
     this.lmslistvalue();
     console.log("data",this.empData)
     console.log("datid",this.empData.user.userId)
     this.leavebalance()
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    // events:[
    //   { title: 'event 1', date: '2024-09-01' }
    // ]
    events:this.LoadEvents.bind(this),
  }
  
  handleDateClick(arg: DateClickArg) {
    console.log('date click! ' + arg.dateStr);
    this.router.navigate(["timesheet",{date:arg.dateStr}

    ]);
  }

  async LoadEvents(args: EventSourceFuncArg): Promise<EventInput[]> {
    return new Promise<EventInput[]>((resolve) => {
      console.log("args",args);
      console.log("endstr",args.endStr.slice(0,10))
      console.log("start",args.startStr.slice(0,10));
      var start=args.startStr.slice(0,10)
 
      this.lmsservice.getholidays(start)
      .subscribe((res)=>{
        console.log("calendardata",res[0]);
        this.calenderItem=res[0];
        const events: EventInput[] = [];
        for(let i of this.calenderItem){
          events.push({
            // title:  i.title,
            date: i.sdate,
            color: i.color.toLowerCase(),
            display:'list-item'
          })}
          console.log("events",events);
          resolve(events);
      })
    }
  )}

  lmslistvalue(){
    this.lmsservice.getlmslist().subscribe(data=>{
      this.lmslist=data
      console.log("lmslist",this.lmslist)
    })
  }

  leavebalance(){
    this.lmsservice.getleavebalance(this.empData.user.userId).subscribe(data=>{
      this.leavebal=data[0]
      console.log("leavebal",this.leavebal)
    })
  }

  onToggleClick(option: string) {
    this.selectedToggle = option;
    console.log('Selected Option:', this.selectedToggle);
    this.attendanceservice.addattendance(this.empData.user.userId,this.selectedToggle,this.mode)
    .subscribe((res)=>{
      console.log('onToggleClick',res)
      Swal.fire({
        text:
          res.message,
        confirmButtonColor:'rgb(133, 187, 131)',
        // background: '#efc96a',
      });
    })

  }

}
