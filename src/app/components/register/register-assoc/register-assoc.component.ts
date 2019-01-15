import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../../../services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';

// Imports for dialog
import { MatDialog } from '@angular/material';
import { ConfirmationDialog } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';


import { AssociationService } from '../../../services/database/Association/association.service';
import { Association } from '../../../interfaces/association.interface';

import { Observable } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';


import { FieldService } from '../../../services/formFields/register-assoc.service';
@Component({
  selector: 'app-register-assoc',
  templateUrl: './register-assoc.component.html',
  styleUrls: ['./register-assoc.component.scss'],
  providers:  [ FieldService ]
})
export class RegisterAssocComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  formFields: any[];
  firstFormFields: any[];
  secondFormFields: any[];
  thirdFormFields: any[];
  labels: string[];

  payload = {};


  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    service: FieldService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private assocSrvc: AssociationService,
    private toastr:  ToastrService
    ) {
    this.formFields = [];
    this.formFields.push(service.getFirstFormFields());
    this.formFields.push(service.getSecondFormFields());
    this.formFields.push(service.getThirdFormFields());

    this.firstFormFields = service.getFirstFormFields();
    this.secondFormFields = service.getSecondFormFields();
    this.thirdFormFields = service.getThirdFormFields();
    this.labels = service.getFormLabels();

  }

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   email: ['', Validators.required],
    //   name: ['', Validators.required],
    //   acname: ['', Validators.required],
    //   cluni: ['', Validators.required]

    // });
  }

  onSubmit(payload: any, index: number) {
    this.payload = Object.assign(this.payload, payload);
    console.log('payload :', this.payload);
    // Change form to array loading...
    if (index === 2) {
      this.openDialog();
    }
  }

  async register() {
    try {
      const email = this.payload['email'];
      const password = 'password';

      // Signup the new user and get its uid
      const credential = await this.authService.emailSignUp(email, password);
      const uid = credential.user.uid;

      // Store all user files
      await this.uploadAllFiles(uid);

      // Register association in DB
      const association: Association = { ...this.payload, uid: uid};
      const createdAssoc = await this.assocSrvc.createAssociation(association);
      console.log('assoc :', createdAssoc);

      this.toastr.success('¡Su registro se realizó exitosamente!', '¡Éxito!', {
        timeOut: 10000
      });
      this.router.navigate(['/index']);
    } catch (error) {
      // Should check for each type of error: SignUp, Upload, CreateAssoc
      // console.log('error :', error);
      this.toastr.error('¡Hubo un error con su registro!', '¡Error!');
    }
  }

  private async uploadAllFiles(uid: string) {
    const logo = this.uploadFile(this.payload['logo'], 'logo', uid);
    const cert = this.uploadFile(this.payload['cert'], 'cert', uid);
    const teamPhotos = this.payload['team'].map((team, index) => {
      return this.uploadFile(team['teamPhoto'], `team${index}`, uid);
    });
    const gallery = Array.from(this.payload['gallery']).map((photo: File, index) => {
      return this.uploadFile(photo, `gallery${index}`, uid);
    });
    // Uploading file
    const files = await Promise.all([
      logo,
      cert,
      Promise.all(teamPhotos),
      Promise.all(gallery)
    ]);
    this.payload['logo'] = files[0];
    this.payload['cert'] = files[1];
    this.payload['team'] = this.payload['team'].map((team, index) => {
      const newTeam = { ...team };
      newTeam['teamPhoto'] = files[2][index];
      return  newTeam;
    });
    this.payload['gallery'] = files[3];
    console.log('files :', files);
    console.log('files :', this.payload);
  }

  private async uploadFile(file: File, fileName: string, uid: string) {

    // The storage path
    const path = `association/${uid}/${fileName}.${file.name.split('.')[1]}`;

    // Totally optional metadata
    const customMetadata = { uid: uid };

    // The main task
    const uploadTask = this.storage.upload(path, file, { customMetadata });

    const fileRef = this.storage.ref(path);
    let downloadURL: Observable<string>;
    // The file's download URL
    // this.task.snapshotChanges().pipe(
    //   finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    // ).subscribe();

    // The file's download URL
    await uploadTask.snapshotChanges().pipe(
      finalize(() => downloadURL = fileRef.getDownloadURL() )
      ).toPromise();
    const url = await downloadURL.toPromise();
    console.log('finished :', fileName);
    return url;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: {title: 'Terminar registro', message: '¿Desea registrarse?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result :', result);
      if (result) {
        this.register();
      }
    });
  }

}
