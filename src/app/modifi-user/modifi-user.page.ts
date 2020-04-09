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
    
    if (this.user.nom != "" && this.user.prenom != "" && this.user.tel != "" && this.user.ville != "" && this.user.campagne != "") {
      let record = {};
      record['nom'] = this.user.nom;
      record['prenom'] = this.user.prenom;
      record['tel'] = this.user.tel;
      record['ville'] = this.user.ville;
      record['campagne'] = this.user.campagne;

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
