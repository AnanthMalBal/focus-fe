import { Component } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/browser';

@Component({
  selector: 'app-scancode',
  templateUrl: './scancode.component.html',
  styleUrls: ['./scancode.component.css']
})
export class ScancodeComponent {

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
      window.location.href = this.scannedResult;
    } else if (this.scannedResult.startsWith('upi://pay')) {
      window.location.href = this.scannedResult;
    } else {
      console.error('Scanned code is not a valid URL:', this.scannedResult);
    }
  }

  onScanError(error: any): void {
    console.error('Error scanning QR code:', error);
  }

  closeCamera(): void {
    this.isCameraActive = false;
  }

}
