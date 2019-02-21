import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Http, Headers } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';

import { Campaign } from '../../../interfaces/campaign.interface';

import * as faker from 'faker';
// sets locale to MX
faker.locale = 'es_MX';


@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  campaignsCollection: AngularFirestoreCollection<any>;
  campaignDocument:   AngularFirestoreDocument<any>;

  constructor( private afs: AngularFirestore ) {
    // Obten la colección con todas las asociaciones:
    this.campaignsCollection = this.afs.collection('campaigns',
    (ref) => ref.orderBy('createdOn', 'desc'));
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.campaignsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getActiveCampaigns(): Observable<any[]> {
    return this.afs.collection('campaigns',
    (ref) => ref
    .where('status', '==', 'active')
    .orderBy('createdOn', 'desc'))
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getAssocCampaigns(assocUid: string): Observable<any[]> {
    return this.afs.collection('campaigns',
    (ref) => ref
    .where('assocUid', '==', assocUid)
    .orderBy('createdOn', 'desc'))
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getCampaign(id: string): AngularFirestoreDocument<Campaign> {
    return this.afs.doc<Campaign>(`campaigns/${id}`);
  }

  createCampaign(campaign: Campaign) {
    campaign.status = 'active';
    campaign.createdOn = new Date();
    console.log('campaign.duration :', campaign.duration);
    campaign.endsOn = this.setEndingDate(Number(campaign.duration));
    console.log('campaign :', campaign);
    return this.campaignsCollection.add(campaign);
  }

  createCampaigns(campaigns: Array<Campaign>): Promise<void> {
    const batch = this.afs.firestore.batch();
    campaigns.forEach(campaign => {
      campaign.status = 'active';
      campaign.createdOn = new Date();
      campaign.endsOn = this.setEndingDate(campaign.duration);
      batch.set(this.afs.firestore.collection('campaigns').doc(), campaign);
    });
    return batch.commit();
  }

  // Donations should never be deleted or updated.
  updateCampaign(id: string, data: any): Promise<void> {
    data.updatedOn = new Date();
    return this.getCampaign(id).update(data);
  }

  updateCampaigns(campaigns: Array<Campaign>): Promise<void> {
    const batch = this.afs.firestore.batch();
    campaigns.forEach(campaign => {
      campaign.updatedOn = new Date();
      batch.update(this.afs.firestore.collection('campaigns').doc(campaign.id), campaign);
    });
    return batch.commit();
  }

  deleteCampaigns(campaigns: Array<Campaign>): Promise<void> {
    const batch = this.afs.firestore.batch();
    campaigns.forEach(campaign => {
      batch.delete(this.afs.firestore.collection('campaigns').doc(campaign.id));
    });
    return batch.commit();
  }

  deleteCampaign(id: string): Promise<void> {
    return this.getCampaign(id).delete();
  }

  insertFake(size: number) {
    const campaigns = Array(size).fill(1).map( _ => {
      const money = this.setGoalAndCurrent(25, 75);
      return {
        title:        faker.company.companyName(),
        description:  faker.lorem.paragraph(),
        logo:         faker.image.people(),

        timeRemaining: this.getRandomIntInclusive(1,50),
        goal: money.goal,
        amountcollected: money.amountcollected,
        percentage: money.percentage,
        numberdonors: this.getRandomIntInclusive(1, 35),
      }
    });
    return this.createCampaigns(campaigns);
  }

  setGoalAndCurrent(goalMin: number, goalMax: number) {
    const goal = this.getRandomIntInclusive(goalMin, goalMax) * 1000;
    const percentage = this.getRandomIntInclusive(0, 99);
    const amountcollected = Math.floor(goal * percentage / 100);
    return {
      goal,
      percentage,
      amountcollected
    };
  }

  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  private setEndingDate(duration: number): Date {
    const endingDate =  new Date();
    endingDate.setDate(endingDate.getDate() + duration);
    return endingDate;
  }

  getTimeRemaining(campaign: Campaign) {
    const now = new Date();
    const endsOn = campaign.endsOn.toDate();
    return this.formatDuration(endsOn.valueOf() - now.valueOf());
  }

  formatDuration (ms: number): string {
    if (ms < 0) { ms = -ms; }
    const time = {
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
      second: Math.floor(ms / 1000) % 60,
      millisecond: Math.floor(ms) % 1000
    };
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
      .join(', ');
  };

}


