import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Http, Headers } from '@angular/http';
import { Association } from '../../../interfaces/association.interface';

import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';

import * as faker from 'faker';
@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  associationsCollection: AngularFirestoreCollection<any>;
  associationDocument:   AngularFirestoreDocument<any>;

  constructor( private afs: AngularFirestore ) {
    // Obten la colección con todas las asociaciones:
    this.associationsCollection = this.afs.collection('users',
    (ref) => ref.where('role', '==', 'association').where('status', '==', 'active').orderBy('createdOn', 'desc'));
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.associationsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getActiveAssociations(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.afs.collection('users',
    (ref) => ref.where('role', '==', 'association').where('status', '==', 'active').orderBy('createdOn', 'desc')).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getInactiveAssociations(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.afs.collection('users',
    (ref) => ref.where('role', '==', 'association').where('status', '==', 'pending').orderBy('createdOn', 'desc')).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getSuspendedAssociations(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.afs.collection('users',
    (ref) => ref.where('role', '==', 'association').where('status', '==', 'suspended').orderBy('createdOn', 'desc')).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getAssociation(id: string): AngularFirestoreDocument<Association> {
    return this.afs.doc<Association>(`users/${id}`);
  }

  createAssociation(association: Association): Promise<void> {
    association.role = 'association';
    association.status = 'pending';
    association.createdOn = new Date();
    return this.associationsCollection.doc(association.uid).set(association);
  }

  updateAssociation(id: string, data: any): Promise<void> {
    return this.getAssociation(id).update(data);
  }

  updateAssociations(associations: Array<Association>): Promise<void> {
    const batch = this.afs.firestore.batch();
    associations.forEach(association => {
      batch.update(this.afs.firestore.collection('users').doc(association.uid), association);
    });
    return batch.commit();
  }

  setActiveAssociations(associations: Array<Association>): Promise<void> {
    const batch = this.afs.firestore.batch();
    associations.forEach(association => {
      batch.update(this.afs.firestore.collection('users').doc(association.uid), {status : 'active'});
    });
    return batch.commit();
  }

  deleteAssociations(associations: Array<Association>): Promise<void> {
    const batch = this.afs.firestore.batch();
    associations.forEach(association => {
      batch.update(this.afs.firestore.collection('users').doc(association.uid), {status : 'deleted'});
    });
    return batch.commit();
  }

  deleteAssociation(id: string): Promise<void> {
    return this.getAssociation(id).delete();
  }

  insertFake(size: number) {
    let associations = Array(100).fill(1).map( _ => {
      return {
        email:    faker.internet.email(),
        name:     faker.name.findName(),
        acname:   faker.company.companyName(),
        cluni:    "012345",
        isDonnor: true,
        logo:     faker.image.people(),

        address:    faker.address.streetName(),
        postalCode: faker.address.zipCode(),
        state:      faker.address.state(),
        locality:   faker.address.city(),
        cellphone:  faker.phone.phoneNumber(),
        phone:      faker.phone.phoneNumber(),
      }
    })
  }

}


