import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Http, Headers } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';

import * as faker from 'faker';
// sets locale to de
faker.locale = "es_MX";

interface Project {
  title?: string;
  description?: string;
  logo?: any;

  goal?: number;
  amountcollected?: number;
  percentage?: number;
  timeRemaining?: number;
  numberdonors?: number;
  rating?: number;

  uid?:          any;
  createdOn?:    Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectsCollection: AngularFirestoreCollection<any>;
  projectDocument:   AngularFirestoreDocument<any>;

  constructor( private afs: AngularFirestore ) {
    // Obten la colección con todas las asociaciones:
    this.projectsCollection = this.afs.collection('projects',
    (ref) => ref.orderBy('createdOn', 'desc'));
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.projectsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  // getActiveProjects(): Observable<any[]> {
  //   // ['added', 'modified', 'removed']
  //   return this.afs.collection('users',
  //   (ref) => ref.where('role', '==', 'project').where('status', '==', 'active').orderBy('createdOn', 'desc')).snapshotChanges().pipe(
  //     map((actions) => {
  //       return actions.map((a) => {
  //         // Data es la información de cada uno de los documentos
  //         const data = a.payload.doc.data();
  //         return { id: a.payload.doc.id, ...data };
  //       });
  //     })
  //   );
  // }

  getProject(id: string): AngularFirestoreDocument<Project> {
    return this.afs.doc<Project>(`projects/${id}`);
  }

  createProject(project: Project): Promise<void> {
    project.createdOn = new Date();
    return this.projectsCollection.doc(project.uid).set(project);
  }

  createProjects(projects: Array<Project>): Promise<void> {
    const batch = this.afs.firestore.batch();
    projects.forEach(project => {
      project.createdOn = new Date();
      batch.set(this.afs.firestore.collection('projects').doc(), project);
    });
    return batch.commit();
  }

  // Donations should never be deleted or updated.
  updateProject(id: string, data: any): Promise<void> {
    return this.getProject(id).update(data);
  }

  updateProjects(projects: Array<Project>): Promise<void> {
    const batch = this.afs.firestore.batch();
    projects.forEach(project => {
      batch.update(this.afs.firestore.collection('projects').doc(project.uid), project);
    });
    return batch.commit();
  }

  deleteProjects(projects: Array<Project>): Promise<void> {
    const batch = this.afs.firestore.batch();
    projects.forEach(project => {
      batch.delete(this.afs.firestore.collection('projects').doc(project.uid));
    });
    return batch.commit();
  }

  deleteProject(id: string): Promise<void> {
    return this.getProject(id).delete();
  }

  insertFake(size: number) {
    const projects = Array(size).fill(1).map( _ => {
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
    return this.createProjects(projects);
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

}


