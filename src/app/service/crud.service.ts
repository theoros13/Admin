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
 
  update_Student(recordID,record){
    this.firestore.doc('Students/' + recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('Students/' + record_id).delete();
  }
}