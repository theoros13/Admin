import { Component, OnInit } from '@angular/core';
import { CrudService } from './../service/crud.service';
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-extrac',
  templateUrl: './extrac.page.html',
  styleUrls: ['./extrac.page.scss'],
})
export class ExtracPage implements OnInit {

  Campagne:any = [];
  work:any = [];
  selected:string = "";

  constructor(
    private crudService: CrudService,
    public plt: Platform,
    public File: File,
    public datepipe: DatePipe,
    private socialSharing: SocialSharing,
  ) { }

  ngOnInit() {

    this.init();

  }

  init(){
    this.crudService.get_all_livreur().subscribe(data => {
      data.map(e => {
        if(!this.Campagne.includes(e.payload.doc.data()['campagne'])){
          var camp = e.payload.doc.data()['campagne'];
          this.Campagne.push(camp);
        }       
      }) 
    });
  }

  CSV(i:string){

    this.selected = i;
    this.work = [];
    this.crudService.get_user_by_campage(this.selected).subscribe(data => {
      data.map(e => {

        this.crudService.get_work_for_user(e.payload.doc.id).subscribe(data => {
      
          this.work.push(data.map(e => {   
    
            if(e.payload.doc.data()['Time_end'] == ""){
              return {
                id: e.payload.doc.id,
                id_user: e.payload.doc.data()['id_user'],
                time_start: new Date(e.payload.doc.data()['Time_start']['seconds'] * 1000),
                time_end: '',
                time_sep: ''
              };
            }else{
              return {
                id: e.payload.doc.id,
                id_user: e.payload.doc.data()['id_user'],
                time_start: new Date(e.payload.doc.data()['Time_start']['seconds'] * 1000),
                time_end: new Date(e.payload.doc.data()['Time_end']['seconds'] * 1000),
                time_sep: new Date(((e.payload.doc.data()['Time_end']['seconds']- e.payload.doc.data()['Time_start']['seconds'])*1000) - 3600000)
              };
            }
          }));    
        });
      })      
    });
  }

  extract(){

    let csv_array:string[] = ['id;id_user;debut;fin;tmp_total;'];

    for(var item in this.work){
      for(var i in this.work[item]){
        csv_array.push(this.work[item][i]['id'] + ';' +  this.work[item][i]['id_user'] + ';' + this.datepipe.transform(this.work[item][i]['time_end'], 'dd/MM/yyyy HH:mm:ss') + ';' + this.datepipe.transform(this.work[item][i]['time_end'], 'dd/MM/yyyy HH:mm:ss') + ';' + this.datepipe.transform(this.work[item][i]['time_sep'], 'HH:mm:ss'));       
      }
    }   
    let csv = csv_array.join('\n');

    if(this.plt.is('cordova')){
      this.File.writeFile(this.File.dataDirectory, this.selected+'.csv', csv, {replace : true}).then(
        res => {
          this.socialSharing.share(null, null, res.nativeURL, null);
        }
      )
    }else{
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = this.selected+'.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }    
  }

  

}
