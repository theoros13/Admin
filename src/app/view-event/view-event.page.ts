import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrudService } from './../service/crud.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
})
export class ViewEventPage implements OnInit {

  event:any;
  participant:any = [];

  constructor(
    public viewCtrl: ModalController,
    private crudService: CrudService, 
    navParams: NavParams,
  ) { }

  ngOnInit() {    
    this.crudService.get_participation(this.event.id).subscribe(data => {
      data.map(e => {
        this.crudService.get_user_by_id(e.payload.doc.data()['id_utilisateur']).subscribe(elements =>{        
          this.participant.push({
              nom: elements.data()['nom'],
              prenom: elements.data()['prenom'],
              tel: elements.data()['tel']
          })     
        })      
      })
    })
  }

  dismiss() {    
    this.viewCtrl.dismiss();
  }

}
