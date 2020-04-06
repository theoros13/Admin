import { Component, OnInit } from '@angular/core';

import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  Livreurs:any;

  constructor(private crudService: CrudService) { }

  ngOnInit() {

    this.crudService.get_all_livreur().subscribe(data => {
 
      this.Livreurs = data.map(e => {
        return {
          id: e.payload.doc.id,
          Nom: e.payload.doc.data()['nom'],
          Prenom: e.payload.doc.data()['prenom']
        };
      })
      console.log(this.Livreurs);
 
    });

  }

}
