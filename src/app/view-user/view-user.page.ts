import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrudService } from './../service/crud.service';
import { NavParams } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { analytics } from 'firebase';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {

  user:any;
  works:any;
  id:string;

  constructor(
    public viewCtrl: ModalController,
    private crudService: CrudService, 
    navParams: NavParams
  ) { 
    this.user = navParams.get('user');
  }

  ngOnInit() {
    this.id = this.user.id;
    this.crudService.get_work_for_user(this.id).subscribe(data => {
      
      this.works = data.map(e => {    
        return {
          id: e.payload.doc.id,
          id_user: e.payload.doc.data()['id_user'],
          time_start: e.payload.doc.data()['Time_start'],
          photo_start: e.payload.doc.data()['Photo_start'],
          time_end: e.payload.doc.data()['Time_end'],
          photo_end: e.payload.doc.data()['Photo_end']
        };
      })
      this.works.sort((a, b)=>{
        return b.time_start.seconds - a.time_start.seconds;
      });

    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
