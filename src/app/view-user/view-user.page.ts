import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrudService } from './../service/crud.service';
import { NavParams } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {

  user:any;
  works:any;
  id:string;
  element: HTMLImageElement;

  constructor(
    public viewCtrl: ModalController,
    private crudService: CrudService, 
    navParams: NavParams,
    public plt: Platform,
    public File: File,
    public datepipe: DatePipe,
    private socialSharing: SocialSharing,
  ) { 
    this.user = navParams.get('user');
  }

  ngOnInit() {

    

    this.id = this.user.id;
    this.crudService.get_work_for_user(this.id).subscribe(data => {
      
      this.works = data.map(e => {   

        if(e.payload.doc.data()['Time_end'] == ""){
          return {
            id: e.payload.doc.id,
            nom : this.user.nom,
            prenom : this.user.prenom,
            tel : this.user.tel,
            time_start: new Date(e.payload.doc.data()['Time_start']['seconds'] * 1000),
            time_end: '',
            time_sep: ''
          };
        }else{
          return {
            id: e.payload.doc.id,
            nom : this.user.nom,
            prenom : this.user.prenom,
            tel : this.user.tel,
            time_start: new Date(e.payload.doc.data()['Time_start']['seconds'] * 1000),
            time_end: new Date(e.payload.doc.data()['Time_end']['seconds'] * 1000),
            time_sep: new Date(((e.payload.doc.data()['Time_end']['seconds']- e.payload.doc.data()['Time_start']['seconds'])*1000) - 3600000)
          };
        }
      })
      this.works.sort((a, b)=>{
        return b.time_start - a.time_start;
      });

    });

    

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  

  async Export(){
    
    let csv_array:string[] = ['id;nom;prenom;tel;debut;fin;tmp_total;'];
    for(var i in this.works){
      csv_array.push(this.works[i]['id'] + ';' +  this.works[i]['nom'] + ';' +  this.works[i]['prenom'] + ';' +  this.works[i]['tel'] + ';' + this.datepipe.transform(this.works[i]['time_end'], 'dd/MM/yyyy HH:mm:ss') + ';' + this.datepipe.transform(this.works[i]['time_end'], 'dd/MM/yyyy HH:mm:ss') + ';' + this.datepipe.transform(this.works[i]['time_sep'], 'HH:mm:ss'));
    }
    let csv:string = csv_array.join("\n");      

    if(this.plt.is('mobile')){
      this.File.writeFile(this.File.dataDirectory, this.user['nom'] + '-' + this.user['prenom']+'.csv', csv, {replace : true}).then(
        res => {
          this.socialSharing.share(null, null, res.nativeURL, null);
        }
      )
    }else{
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = this.user['nom'] + '-' + this.user['prenom']+'.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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

        this.File.writeFile(this.File.dataDirectory, this.user['nom'] + '-' + this.user['prenom']+'-qrcode.png', blob, {replace : true}).then(
          res => {
            this.socialSharing.share(null, null, res.nativeURL, null);
          }
        )
      
      }else{
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute('visibility','hidden');
        link.download = this.user['nom'] + '-' + this.user['prenom']+'-qrcode';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }       
  }
}
