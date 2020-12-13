import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  new_livreur(record) {
    return this.firestore.collection('Utilisateurs').add(record);
  }
 
  get_all_livreur() {
    return this.firestore.collection('Utilisateurs').snapshotChanges();
  }

  get_all_livreur_nom() {
    return this.firestore.collection('Utilisateurs', ref => ref.orderBy('nom')).snapshotChanges();
  }

  get_all_livreur_ville() {
    return this.firestore.collection('Utilisateurs', ref => ref.orderBy('ville')).snapshotChanges();
  }

  get_all_livreur_campagne() {
    return this.firestore.collection('Utilisateurs', ref => ref.orderBy('campagne')).snapshotChanges();
  }
 
  update_livreur(recordID,record){
    return this.firestore.doc('Utilisateurs/' + recordID).update(record);
  }
 
  delete_Livreur(record_id) {
    var w = this.firestore.collection('Work', ref => ref.where('id_user', '==', record_id)).snapshotChanges();
    w.subscribe(data=>{
      data.map(e=>{
        this.firestore.doc('Work/' + e.payload.doc.id).delete();
      });
    })
    this.firestore.doc('Utilisateurs/' + record_id).delete();
  }

  get_work_for_user(userId){
    return this.firestore.collection('Work', ref => ref.where('id_user', '==', userId)).snapshotChanges();
  }

  get_user_by_id(userId){
    return this.firestore.doc('Utilisateurs/'+userId).get();
  }

  get_user_by_campage(t){
    return this.firestore.collection('Utilisateurs', ref => ref.where('campagne', '==', t)).snapshotChanges();
  }

  get_all_event(){
    return this.firestore.collection('evenement').snapshotChanges();
  }

  del_event(id:string){
    return this.firestore.doc('evenement/'+id).delete();
  }

  get_participation(id_event:string){
    return this.firestore.collection('participation', ref => ref.where('id_evenement', '==', id_event)).snapshotChanges();
  }

}