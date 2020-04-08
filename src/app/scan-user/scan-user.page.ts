import { Component, OnInit } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AlertController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scan-user',
  templateUrl: './scan-user.page.html',
  styleUrls: ['./scan-user.page.scss'],
})
export class ScanUserPage implements OnInit {

  cameraAvailable:boolean = false;
  public showCamera = false;
  public textScanned: string = '';

  constructor(
    private diagnostic: Diagnostic,
    public alertController: AlertController,
    private qrScanner: QRScanner,
    ) { }

  async ngOnInit() {
    const alert = await this.alertController.create({
      header: 'Error camera',
      message: 'La camera n\'est pas disponible',
      buttons: [
        {
          text: 'ok'
        }
      ]
    });

    
    this.diagnostic.isCameraPresent().then(
      (isAvailable : any) => {
        this.cameraAvailable = true;
      }
    ).catch(async (error:any)=>{
      console.dir("Camera is: " + error);
      await alert.present();
    });
  }

  scanCode() {
    this.showCamera = true;
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // start scanning
        console.log('Scan en cours...' + JSON.stringify(status));
        const scanSub = this.qrScanner.scan().subscribe((text: any) => {
          console.log('Scanned something', text.result);
          this.textScanned = text.result;
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.showCamera = false;
        });
      } else if (status.denied) {
        this.cameraAvailable = false;
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  closeCamera() {
    this.showCamera = false;
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
  }
}
