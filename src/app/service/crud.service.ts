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
    this.firestore.doc('Utilisateurs/' + record_id).delete();
  }

  get_work_for_user(userId){
    console.log(userId);
    return this.firestore.collection('Work', ref => ref.where('id_user', '==', userId)).snapshotChanges();
  }
}