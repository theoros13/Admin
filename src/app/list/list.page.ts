import { Component, OnInit } from '@angular/core';

import { CrudService } from './../service/crud.service';
import { ModalController } from '@ionic/angular';
import { ModifiUserPage } from '../modifi-user/modifi-user.page';
import { ViewUserPage } from '../view-user/view-user.page'; 

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  Livreurs:any;

  constructor(
    private crudService: CrudService,
    public modalController: ModalController,
    ) { }

  ngOnInit() {

    this.crudService.get_all_livreur().subscribe(data => {
 
      this.Livreurs = data.map(e => {
        return {
          id: e.payload.doc.id,
          Nom: e.payload.doc.data()['nom'],
          Prenom: e.payload.doc.data()['prenom'],
          Tel: e.payload.doc.data()['tel'],
          Ville: e.payload.doc.data()['ville'],
          Campagne: e.payload.doc.data()['campagne']
        };
      })
      console.log(this.Livreurs);
 
    });

  }

  tri_nom(){
    this.crudService.get_all_livreur_nom().subscribe(data => {
 
      this.Livreurs = data.map(e => {
        return {
          id: e.payload.doc.id,
          Nom: e.payload.doc.data()['nom'],
          Prenom: e.payload.doc.data()['prenom'],
          Tel: e.payload.doc.data()['tel'],
          Ville: e.payload.doc.data()['ville'],
          Campagne: e.payload.doc.data()['campagne']
        };
      })
      console.log(this.Livreurs);
 
    });
  }

  tri_ville(){
    this.crudService.get_all_livreur_ville().subscribe(data => {
 
      this.Livreurs = data.map(e => {
        return {
          id: e.payload.doc.id,
          Nom: e.payload.doc.data()['nom'],
          Prenom: e.payload.doc.data()['prenom'],
          Tel: e.payload.doc.data()['tel'],
          Ville: e.payload.doc.data()['ville'],
          Campagne: e.payload.doc.data()['campagne']
        };
      })
      console.log(this.Livreurs);
 
    });
  }

  tri_campagne(){
    this.crudService.get_all_livreur_campagne().subscribe(data => {
 
      this.Livreurs = data.map(e => {
        return {
          Id: e.payload.doc.id,
          Nom: e.payload.doc.data()['nom'],
          Prenom: e.payload.doc.data()['prenom'],
          Tel: e.payload.doc.data()['tel'],
          Ville: e.payload.doc.data()['ville'],
          Campagne: e.payload.doc.data()['campagne']
        };
      })
      console.log(this.Livreurs);
 
    });
  }

  delete(id:string){
    this.crudService.delete_Livreur(id);
  }

  async update(item:any){
    console.log(item);    
    const modal = await this.modalController.create({
      component: ModifiUserPage,
      componentProps: {'user' : item}
    });
    return await modal.present();
  }

  async view(item:any){
    console.log(item);    
    const modal = await this.modalController.create({
      component: ViewUserPage,
      componentProps: {'user' : item}
    });
    return await modal.present();
  }

}
