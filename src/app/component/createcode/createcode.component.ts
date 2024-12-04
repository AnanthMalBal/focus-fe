import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-createcode',
  templateUrl: './createcode.component.html',
  styleUrls: ['./createcode.component.css']
})
export class CreatecodeComponent {

  @ViewChild('qrCodeContainer', { static: false }) qrCodeContainer!: ElementRef;

  QRcodeform!:FormGroup;
  qrCodeData!:string;
  formdata:any;
  isQRCodeGenerated = false;

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
    this.isQRCodeGenerated = true;
  }

  async downloadAsPDF() {
    const element = this.qrCodeContainer.nativeElement;
    const canvas = await html2canvas(element);
    const imageData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imageData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${this.formdata.productName}-QRCode.pdf`);
    this.formdata.reset();
  } 
 
}
