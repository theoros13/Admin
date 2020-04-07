import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CrudService } from './../service/crud.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modifi-user',
  templateUrl: './modifi-user.page.html',
  styleUrls: ['./modifi-user.page.scss'],
})
export class ModifiUserPage implements OnInit {

  user:any;

  constructor(
    public viewCtrl: ModalController,
    private crudService: CrudService, 
    public loadingController: LoadingController,
    public alertController: AlertController,
    navParams: NavParams
     ) { 
     this.user = navParams.get('user');      
  }

  ngOnInit() {

  }

  async modifier(){
    
    if (this.user.Nom != null && this.user.Prenom != null && this.user.Tel != null && this.user.Ville != null && this.user.Campagne != null) {
      let record = {};
      record['nom'] = this.user.Nom;
      record['prenom'] = this.user.Prenom;
      record['tel'] = this.user.Tel;
      record['ville'] = this.user.Ville;
      record['campagne'] = this.user.Campagne;

      const loading = await this.loadingController.create({message: 'Please wait...'});
      loading.present();
      this.crudService.update_livreur(this.user.id,record).then(resp => {
        loading.dismiss();
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
