import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { LeaveService } from 'src/app/services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leavehistory',
  templateUrl: './leavehistory.component.html',
  styleUrls: ['./leavehistory.component.css']
})
export class LeavehistoryComponent {

  empData:any;
  leavedata:any;
  idi=10504

constructor(private leaveservice:LeaveService,
  private authservice:AuthserviceService,

){  authservice.apiData$.subscribe(data => this.empData = data)}

  ngOnInit(): void {
    this.getLeaves();
  }

  getLeaves(){
    this.leaveservice.getleavehistory(this.idi)
    .subscribe((result)=>{
      this.leavedata=result.result;
      console.log('leavedata',this.leavedata);
    })

  }
  cancelleave(id:any){
    this.leaveservice.cancelLeave(id)
    .subscribe((result:any)=>{
      const resData=result
      Swal.fire({
        text:
          resData.message,
          confirmButtonColor: '#2ecc71',
      });
      this.getLeaves();
    })

  }

}
