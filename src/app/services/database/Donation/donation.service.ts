import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Http, Headers } from '@angular/http';
import { Donation } from '../../../interfaces/donation.interface';

import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  donationsCollection: AngularFirestoreCollection<any>;
  donationDocument:   AngularFirestoreDocument<any>;

  constructor( private afs: AngularFirestore ) {
    // Obten la colección con todas las asociaciones:
    this.donationsCollection = this.afs.collection('donations',
    (ref) => ref.orderBy('createdOn', 'desc'));
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.donationsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getReceivedDonations(uid: string): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.afs.collection('donations',
    (ref) => ref.where('to', '==', uid).orderBy('createdOn', 'desc')).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getDonation(id: string): AngularFirestoreDocument<Donation> {
    return this.afs.doc<Donation>(`donations/${id}`);
  }

  createDonation(donation: Donation): Promise<void> {
    donation.createdOn = new Date();
    return this.donationsCollection.doc(donation.uid).set(donation);
  }

  // Donations should never be deleted or updated.
  updateDonation(id: string, data: any): Promise<void> {
    return this.getDonation(id).update(data);
  }

  updateDonations(donations: Array<Donation>): Promise<void> {
    const batch = this.afs.firestore.batch();
    donations.forEach(donation => {
      batch.update(this.afs.firestore.collection('donations').doc(donation.uid), donation);
    });
    return batch.commit();
  }

  deleteDonations(donations: Array<Donation>): Promise<void> {
    const batch = this.afs.firestore.batch();
    donations.forEach(donation => {
      batch.delete(this.afs.firestore.collection('donations').doc(donation.uid));
    });
    return batch.commit();
  }

  deleteDonation(id: string): Promise<void> {
    return this.getDonation(id).delete();
  }
}


