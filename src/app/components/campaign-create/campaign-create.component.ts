import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

// Imports for dialog
import { MatDialog } from '@angular/material';
import { ConfirmationDialog } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

// Importing the models and objects
import { AssociationService } from '../../services/database/Association/association.service';
import { CampaignService } from '../../services/database/Campaign/campaign.service';
import { Campaign } from '../../interfaces/campaign.interface';

import { Observable } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';

import { FieldService } from '../../services/formFields/campaing-create.service';


@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss'],
  providers:  [ FieldService ]
})
export class CampaignCreateComponent implements OnInit {

  formGroups: FormGroup[];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  formFields: any[];
  firstFormFields: any[];
  secondFormFields: any[];

  logo: any;
  payload = {};
  uid: any;

  constructor(
    public dialog: MatDialog,
    service: FieldService,
    private router: Router,
    private authService: AuthService,
    private campaignSrvc: CampaignService,
    private assocSrvc: AssociationService,
    private toastr:  ToastrService,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage,
  ) {
    this.formFields = service.getFormFields();
    // Obtenemos los parámetros de las rutas...
    this.activatedRoute.params.subscribe(params => {
      if ( params['id'] ) {
        this.uid = params['id'];
      }
    });

  }

  ngOnInit() {
  }

  onSubmit(index: number, payload: any = {}) {
    this.payload = { ...this.payload, ...payload };
    console.log('payload :', this.payload);
    // Change form to array loading...
    if (index === (this.formFields.length - 1) ) {
      this.openDialog();
    }
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: {title: 'Crear campaña', message: '¿Desea registrar una nueva campaña?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result :', result);
      if (result) {
        this.register();
      }
    });
  }

  private async register() {
    try {
      this.logo =  this.payload['logo'];
      delete this.payload['logo'];

      // Create new campaign
      const campaign: Campaign = { ...this.payload };
      const createdCampaign = await this.campaignSrvc.createCampaign(campaign);

      // Upload images related to campaign
      await this.uploadAllFiles(createdCampaign.id);

      // Update campaign object to include uploaded images
      await this.campaignSrvc.updateCampaign(createdCampaign.id, this.payload);

      // Assign this campaign as current campaign
      await this.assocSrvc.updateAssociation(this.uid, {currentCampaign: createdCampaign.id});

      // Inform user register was succesful
      this.toastr.success('¡Su campaña ha sido creada exitosamente!', '¡Éxito!', {
        timeOut: 10000
      });

      // Return to index
      // this.router.navigate(['/apoyar']);

    } catch (error) {
      console.log('error :', error);
      this.toastr.error('¡Hubo un error al crear la campaña!', '¡Error!');
    }
  }

  private async uploadAllFiles(id: string) {
    try {
      const logo = this.uploadFile(this.logo, 'logo', id);
      // Uploading file
      const files = await Promise.all([
        logo,
      ]);
      this.payload['logo'] = files[0];
      console.log('files :', this.payload);
    } catch (error) {
      console.log('Error updating a file!');
      throw error;
    }

  }

  private async uploadFile(file: File, fileName: string, id: string) {
    try {
      // The storage path
      const path = `campaigns/${id}/${fileName}.${file.name.split('.')[1]}`;

      // Totally optional metadata
      const customMetadata = { id: id };

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
      return url;
    } catch (error) {
      console.log('Error uploading file', fileName);
      throw error;
    }

  }

}
