import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilesDBDto, Projet } from './../models/projet.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { getTempsParLigne, getTempsParProjet } from '../utils/util';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../service/api.service';
import { Observable } from 'rxjs';
import { UploadFileService } from './../service/upload-file.service';
import { element } from 'protractor';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.scss']
})
export class DetailProjetComponent implements OnInit {
  displayedColumns: string[] = ['position','libelle', 'tache', 'description', 'dateDebut', 'dateFin', 'tempsPasse'];
  projet: Projet;

  // File
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  // fileInfos?: Observable<any>;
  fileProjet?: FilesDBDto[] = [];
  
  pres: Projet;
  body: any;
  idProjet : number;
  constructor(private route: ActivatedRoute, private api: ApiService, private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.idProjet = this.route.snapshot.params['id'];

    this._getProjet(this.idProjet);

    // this.fileInfos = this.uploadService.getFiles();

    this._getFileProjet();
  }

  private _getProjet(id: number) {
    this.api.getProjetFromServer(id).subscribe(data => {
      this.projet = data;
    });
  }

  getCount(element){
    return getTempsParProjet(element);
  }

  getCountLigne(element){
    return getTempsParLigne(element);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;

              this.body = event.body; 
              this._addFileProjet()
              // mis à jour des donées
              this.ngOnInit();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          }
        );
      }
  
      this.selectedFiles = undefined;
    }
  }

  _addFileProjet(){
    console.log(this.body)

    this.uploadService.addFileToProjet(this.projet,this.body?.id).subscribe();
  }

  _getFileProjet(){
    this.api.getProjetFromServer(this.idProjet).subscribe(data => {
      this.fileProjet = data.filesDBDto;
      this.fileProjet = [...this.fileProjet]
    })
  }

  deleteFile(file: FilesDBDto){
    const idFile = file.id;
    this.uploadService.deleteFile(idFile).subscribe(data => {
      // retourne le message de validation de la supp ou non

      // mis à jour des donées
      this.ngOnInit();
    });
  }
}
