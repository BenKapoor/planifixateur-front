import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { LignesProjetDto, Projet } from './../models/projet.model';
import Util, { getTempsParProjet } from './../utils/util';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { ApiService } from './../service/api.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {

  displayedColumns: string[] = ['position','nom','nb_lignes', 'temps_passe', 'star'];
  dataSource: Projet[];
  
  projets: Projet[];

  projetSuscribtion: Subscription;

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    // this.api.projetSubject.subscribe(
    //   (projets: Projet[]) => {
    //     this.projets = projets;
    //     this.dataSource = projets;
    //   }
    // );

    // this.api.emitProjetSubject();
    this.api.getAllProjetFromServer().subscribe(data=>{
      this.projets = data;
      this.dataSource = data;
    });

    // this.onFetch();
  }

  onFetch(){
    this.api.getAllProjetFromServer();
  }

  onAddLigne(i){
    const id = this.projets[i].id;
    return this.router.navigate(['/projet','add-ligne', id]);
  }

  onViewDetail(i){
    const id = this.projets[i].id;
    return this.router.navigate(['/projet','view', id]);
  }

  onUpdate(i){
    const id = this.projets[i].id;
    return this.router.navigate(['/projet','update', id]);
  }

  onDelete(i){
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: 'Confirmation de la suppression',
        message: 'Etes-vous sûr de vouloir supprimer ce projet : ' + this.projets[i].nom
      }
    });
    confirmDialog.afterClosed().subscribe(result =>{
      if (result === true) {
        const id = this.projets[i].id;
        // suppression au niveau de la db
        this.api.deleteProjet(id).subscribe();

        // suppression de l'array aau niveau visuel
        this.dataSource = this.dataSource.filter(item => item.id !== this.projets[i].id);
      }
    });
  }

  tempsPasse: string = '';
  arrayTemps: any[] = [];

  getCount(element){
    return getTempsParProjet(element);
  }
}