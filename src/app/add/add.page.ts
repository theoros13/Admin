import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  id:string = null;
  nom:string = null;
  prenom:string = null;
  tel:string = null;
  ville:string = null;
  campagne:string = null;

  constructor(
    private crudService: CrudService, 
    public loadingController: LoadingController, 
    public alertController: AlertController,
    ) { }

  ngOnInit() {
  }

  async ajouter(){
    if (this.nom != null || this.prenom != null || this.tel != null || this.ville != null || this.campagne != null) {
      let record = {};
      record['nom'] = this.nom;
      record['prenom'] = this.prenom;
      record['tel'] = this.tel;
      record['ville'] = this.ville;
      record['campagne'] = this.campagne;

      const loading = await this.loadingController.create({message: 'Please wait...'});
      loading.present();
      this.crudService.new_livreur(record).then(resp => {
        loading.dismiss();
        this.id = resp.id;
      }); 
    }else{
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Veulliez remplire toutes les informations',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    
  }

  

}
