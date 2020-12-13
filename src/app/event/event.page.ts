import { ViewEventPage } from './../view-event/view-event.page';
import { ModifEventPage } from '../modif-event/modif-event.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  evenement:any;

  constructor(
    private crudService: CrudService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {

    this.crudService.get_all_event().subscribe(data => {

      this.evenement = data.map(e => {        
        return {
          id: e.payload.doc.id,
          titre: e.payload.doc.data()['titre'],
          description: e.payload.doc.data()['description'],
          ville: e.payload.doc.data()['ville'],
          date_heure: new Date(e.payload.doc.data()['date_heure']['seconds'] * 1000)
        };
      })
    })

  }

  del_event(id:string){
    this.crudService.del_event(id)
  }

  async view(item:any){
    const modal = await this.modalController.create({
      component: ViewEventPage,
      componentProps: {'event' : item}
    });
    return await modal.present();
  }

  async update(item:any){
    const modal = await this.modalController.create({
      component: ModifEventPage,
      componentProps: {'event' : item}
    });
    return await modal.present();
  }
}
