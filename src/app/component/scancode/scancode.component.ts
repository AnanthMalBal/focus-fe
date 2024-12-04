import { Component, ViewChild } from '@angular/core';
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/browser';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scancode',
  templateUrl: './scancode.component.html',
  styleUrls: ['./scancode.component.css']
})
export class ScancodeComponent {

  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  scannedResult: string | null = null;
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined = undefined;
  device: MediaDeviceInfo | undefined = undefined;
  isCameraActive: boolean = true;
  formats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13
  ];

  onCodeResult(resultString: string) {
    this.scannedResult = resultString;
    this.closeCamera();
    if (this.scannedResult.startsWith('http')) {
      // Navigate to the scanned URL
      window.location.href = this.scannedResult;
    } else if(this.scannedResult.startsWith('upi://pay')) {
      window.location.href = this.scannedResult;
    }
    else {
      console.error('Scanned code is not a valid URL:', this.scannedResult);
    }
  }

  onScanError(error: any): void {
    console.error('Error scanning QR code:', error);
  }

  closeCamera(): void {
    this.isCameraActive = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.displayImage(this.selectedFile);
      this.decodeImageFile(this.selectedFile);
    }
  }

  decodeImageFile(file: File) {
    const reader = new FileReader();
    const codeReader = new BrowserMultiFormatReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = async () => {
        try {
          const result = await codeReader.decodeFromImageElement(img);
          this.scannedResult = result.getText();
        } catch (err) {
          console.error('Could not decode the image', err);
        }
      };
    };

    reader.readAsDataURL(file);
  }

  displayImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result; // Set the data URL to display in the template
    };
    reader.readAsDataURL(file);
  }
}


