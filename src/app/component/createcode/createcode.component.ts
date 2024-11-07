import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createcode',
  templateUrl: './createcode.component.html',
  styleUrls: ['./createcode.component.css']
})
export class CreatecodeComponent {

  QRcodeform!:FormGroup;
  qrCodeData!:string;
  formdata:any;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {

    this.QRcodeform=this.fb.group({
      productName: ['', [Validators.required]],
      productDetails: ['', [Validators.required]]
    })
  }

  createQR(){
    console.log("form",this.QRcodeform.value);
    this.formdata=this.QRcodeform.value
    this.qrCodeData = JSON.stringify({
      name: this.formdata.productName,
      details: this.formdata.productDetails
    });

  }
}
