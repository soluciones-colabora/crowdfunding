import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Http, Headers } from '@angular/http';
import { Donnor } from '../../../interfaces/donnor.interface';

import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonnorService {

  donnorsCollection: AngularFirestoreCollection<any>;
  donnorDocument:   AngularFirestoreDocument<any>;

  constructor( private afs: AngularFirestore ) {
    // Obten la colección con todas las asociaciones:
    this.donnorsCollection = this.afs.collection('users',
    (ref) => ref.where('role', '==', 'donnor').where('status', '==', 'active').orderBy('createdOn', 'desc'));
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.donnorsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getActiveDonnors(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.afs.collection('users',
    (ref) => ref.where('role', '==', 'donnor').where('status', '==', 'active').orderBy('createdOn', 'desc')).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getInactiveDonnors(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.afs.collection('users',
    (ref) => ref.where('role', '==', 'donnor').where('status', '==', 'pending').orderBy('createdOn', 'desc')).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getSuspendedDonnors(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.afs.collection('users',
    (ref) => ref.where('role', '==', 'donnor').where('status', '==', 'suspended').orderBy('createdOn', 'desc')).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getDonnor(id: string): AngularFirestoreDocument<Donnor> {
    return this.afs.doc<Donnor>(`users/${id}`);
  }

  createDonnor(donnor: Donnor): Promise<void> {
    donnor.role = 'donnor';
    donnor.status = 'pending';
    donnor.createdOn = new Date();
    return this.donnorsCollection.doc(donnor.uid).set(donnor);
  }

  updateDonnor(id: string, data: any): Promise<void> {
    return this.getDonnor(id).update(data);
  }

  updateDonnors(donnors: Array<Donnor>): Promise<void> {
    const batch = this.afs.firestore.batch();
    donnors.forEach(donnor => {
      batch.update(this.afs.firestore.collection('users').doc(donnor.uid), donnor);
    });
    return batch.commit();
  }

  setActiveDonnors(donnors: Array<Donnor>): Promise<void> {
    const batch = this.afs.firestore.batch();
    donnors.forEach(donnor => {
      batch.update(this.afs.firestore.collection('users').doc(donnor.uid), {status : 'active'});
    });
    return batch.commit();
  }

  deleteDonnors(donnors: Array<Donnor>): Promise<void> {
    const batch = this.afs.firestore.batch();
    donnors.forEach(donnor => {
      batch.update(this.afs.firestore.collection('users').doc(donnor.uid), {status : 'deleted'});
    });
    return batch.commit();
  }

  deleteDonnor(id: string): Promise<void> {
    return this.getDonnor(id).delete();
  }
}


