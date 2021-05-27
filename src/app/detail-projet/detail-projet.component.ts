import * as moment from 'moment-timezone';

import { Component, OnInit } from '@angular/core';
import { FilesDBDto, LignesProjetDto, Projet } from './../models/projet.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../service/api.service';
import { UploadFileService } from './../service/upload-file.service';
import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { transfoSecEnJHMS } from '../utils/util';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  getCount(element: Projet){
    return transfoSecEnJHMS(element?.tempsTotal);
  }

  getCountLigne(element: LignesProjetDto){
    return transfoSecEnJHMS(element?.tempsTotal);
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

  private _addFileProjet(){
    this.uploadService.addFileToProjet(this.projet,this.body?.id).subscribe();
  }

  private _getFileProjet(){
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

  generatePDF() {  
    let index_row = 1;
    let docDefinition = {  
      info: { title: this.projet.nom + new Date().toLocaleString() },
      // watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
      footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
      header: function(currentPage, pageCount, pageSize) {
        return [
          { text: 'Planifixateur', alignment: (currentPage % 2) ? 'left' : 'right', fontSize: 9, },
          { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
        ]
      },
      content: [  
        // {  
        //   text: 'Planifixateur',  
        //   fontSize: 16,  
        //   alignment: 'center',  
        //   color: '#047886'  
        // },  
        {  
          text: this.projet.nom,  
          fontSize: 20,  
          bold: true,  
          alignment: 'center',  
          decoration: 'underline',  
          color: 'skyblue',
        },
        {  
          columns: [
            { 
              stack : [ 
                [   
                  {   
                    text: 'Nombre de tâches : ' + this.projet.lignesProjetDto.length, 
                    italic: true,
                  },   
                ], 
              ],
              alignement: 'left',
              fontSize: 10,
              margin: [5, 15]
            },
            { 
              stack : [  
                [  
                  {  
                      text: `Réalisé le : ${new Date().toLocaleString()}`,  
                      alignment: 'right'  
                  }, 
                  {  
                    text: `Temps Total : ${transfoSecEnJHMS(this.projet.tempsTotal)}`,  
                    alignment: 'right'  
                  },  
                ]
              ],
              fontSize: 10,
              margin: [5, 15]
            },   
          ]  
        },
      {  
        text: 'Détail des lignes',  
        style: 'sectionHeader'  
      },  
      {  
        style: 'table',
        layout: 'lightHorizontalLines',
        table: {  
            headerRows: 1,  
            widths: ['*', 'auto', 'auto', 90, 90, 'auto', 'auto'],  
            body: [  
                ['','Début', 'Fin', 'Tâche', 'Description', 'Libellé', 'Temps'],  
                ...this.projet.lignesProjetDto.map(ligne => (
                  [
                    index_row++, 
                    moment(ligne.dateDebut).format("MM-DD-YYYY kk:mm"), 
                    moment(ligne.dateFin).format("MM-DD-YYYY kk:mm"), 
                    ligne.tache, 
                    ligne.description, 
                    ligne.libelle, 
                    transfoSecEnJHMS(ligne.tempsTotal)
                  ])),  
                [{ text: 'Total', colSpan: 3,  bold: true}, {}, {}, {}, {}, {}, { text : transfoSecEnJHMS(this.projet.tempsTotal),  bold: true}]
            ]  
        },
          
      }  
      ],
        styles: {  
          sectionHeader: {  
              bold: true,  
              decoration: 'underline',  
              fontSize: 14,  
              margin: [0, 15, 0, 15]  
          },
          table: {
              fontSize: 8,
              alignment: 'left',
              color: 'black',
              margin: [0, 5, 0, 15]
          }, 
        }     
    };  
   
    pdfMake.createPdf(docDefinition).open();  
  }  
}
