import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { LignesProjetDto, Projet } from './../models/projet.model';
import Util, { getTempsParProjet } from './../utils/util';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { ApiService } from './../service/api.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource = new MatTableDataSource();
  
  projets: Projet[];

  projetSuscribtion: Subscription;

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {

    this.api.getAllProjetFromServer().subscribe(data=>{
      this.projets = data;
      this.dataSource = new MatTableDataSource(data);
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

  onDelete(index: number){
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: 'Confirmation de la suppression',
        message: 'Etes-vous sûr de vouloir supprimer ce projet : ' + this.projets[index].nom
      }
    });
    confirmDialog.afterClosed().subscribe(result =>{
      if (result === true) {
        const id = this.projets[index].id;
        // suppression au niveau de la db
        this.api.deleteProjet(id).subscribe();

        // suppression de l'array au niveau visuel
        this.dataSource.data.splice(index,1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  tempsPasse: string = '';
  arrayTemps: any[] = [];

  getCount(element){
    return getTempsParProjet(element);
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}