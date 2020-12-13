import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CrudService } from './../service/crud.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modif-event',
  templateUrl: './modif-event.page.html',
  styleUrls: ['./modif-event.page.scss'],
})
export class ModifEventPage implements OnInit {

  event:any;

  constructor(
    public viewCtrl: ModalController,
    private crudService: CrudService, 
    public loadingController: LoadingController,
    public alertController: AlertController,
    navParams: NavParams
  ) {
    this.event = navParams.get('event'); 
   }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
