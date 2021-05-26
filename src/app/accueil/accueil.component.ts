import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiService } from './../service/api.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Projet } from './../models/projet.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { transfoSecEnJHMS } from './../utils/util';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {

  displayedColumns: string[] = ['position','nom','nb_lignes', 'temps_passe', 'star'];
  dataSource: MatTableDataSource<Projet>;
  
  projets: Projet[];

  projetSuscribtion: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router) {
    
  }

  ngOnInit(): void {
    this._getApiProjets();
  }

  private _getApiProjets(){
    this.api.getAllProjetFromServer().subscribe(data=>{
      this.projets = data;
      this.dataSource = new MatTableDataSource<Projet>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onFetch(){
    this.api.getAllProjetFromServer();
  }

  onAddLigne(element: Projet){

    const id = element.id;
    return this.router.navigate(['/projet','add-ligne', id]);
  }

  onViewDetail(element: Projet){
    const id = element.id;
    return this.router.navigate(['/projet','view', id]);
  }

  onUpdate(element: Projet){
    const id = element.id;
    return this.router.navigate(['/projet','update', id]);
  }

  onDelete(element: Projet){    
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title: 'Confirmation de la suppression',
        message: 'Etes-vous sûr de vouloir supprimer ce projet : ' + element.nom
      }
    });
    confirmDialog.afterClosed().subscribe(result =>{
      if (result === true) {
        const id = element.id;
        // suppression au niveau de la db
        this.api.deleteProjet(id).subscribe();

        // retrouver la position dans le data source grâce à l'id de l'objet
        const index = this.dataSource.data.indexOf(element)
        
        // suppression de l'array au niveau visuel
         this.dataSource.data.splice(index,1);
        
        this.dataSource._updateChangeSubscription();

      }
    });
  }

  getCount(element: Projet){
    return transfoSecEnJHMS(element.tempsTotal);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}