import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { CrudService } from './../service/crud.service';
import * as $ from 'jquery';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
  noms:string;
  prenoms:string;

  constructor(
    private crudService: CrudService, 
    public loadingController: LoadingController, 
    public alertController: AlertController,
    public plt: Platform,
    public File: File,
    private socialSharing: SocialSharing,
    ) { }

  ngOnInit() {
  }

  async ajouter(){
    if (this.nom != null && this.prenom != null && this.tel != null && this.ville != null && this.campagne != null) {
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
        this.noms = this.nom;
        this.prenoms = this.prenom;
        this.id = resp.id;
        this.nom = null;
        this.prenom = null;
        this.tel = null;
        this.ville = null;
        this.campagne = null;
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

  getPng(){
    var src = $('img').attr('src')
    
    let byteCharacters = window.atob(src.split(',')[1]);

    let byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    let blob = new Blob([byteArray], {"type": "image/png"});

    if(this.plt.is('mobile')){

      this.File.writeFile(this.File.dataDirectory, this.noms + '-' + this.prenoms+'-qrcode.png', blob, {replace : true}).then(
        res => {
          this.socialSharing.share(null, null, res.nativeURL, null);
        }
      )
    
    }else{
      let link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute('visibility','hidden');
      link.download = this.noms + '-' + this.prenoms+'-qrcode';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }       
  } 

}
