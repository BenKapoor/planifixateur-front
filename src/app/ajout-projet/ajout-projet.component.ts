import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LignesProjetDto, Projet, TacheDto } from './../models/projet.model';

import { ApiService } from './../service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { unique } from 'jquery';

export interface User {
  libelle: string;
}

@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.scss']
})
export class AjoutProjetComponent implements OnInit {
  // Array dans lequel on stock les taches des lignes non filtrées
  taches: Array<any> = []

  // autocomplete
  myControl = new FormControl();
  // Array dans lequel on stock les taches des lignes filtrées
  options?: Observable<string[]>;
  
  // Array stockant les lignes
  lignes: Array<LignesProjetDto> = [];

  isDisplayed = false;
  // isDisabled = false;
  displayedColumns: string[] = ['position','libelle'];

  // Projet
  projetForm: FormGroup;
  spresp: Projet[] = [];
  
  // Ligne du projet
  lignesForm: FormGroup;
  ligneresp: LignesProjetDto[] = [];

  constructor(private formBuilder: FormBuilder, private api: ApiService, public snackBar: MatSnackBar, private router: Router) { }

  private _openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000
    });
  }

  ngOnInit(): void {
    // initialisation des différents formulaires
    this.initFormProjet();
    this.initFormLigne();

    this.ligneresp;
    // this.indexTab = this.ligneresp.length;

    // this.getTacheFromServ();
    this.getLigneFromServe();
  }  
  
  initFormProjet(){
    this.projetForm = this.formBuilder.group({
      nom: ['',[Validators.required, Validators.maxLength(255)]],
    })
    
  }

  onSubmitFormP(){
    const formValue = this.projetForm.value;

    const newProjet = new Projet(
      formValue['nom'],
    );

    this.api.addProjet(newProjet).subscribe(data => {

      //Récupération de l'objet enregistré (id, nom, etc)
      this.spresp.push(data);
    })
    // Réinitialisation du fomulaire après chaque submit
    // this.projetForm.reset();

    // Cache le formulaire après la saisie du projet
    this.isDisplayed = true;
  }

  initFormLigne(){
    this.lignesForm = this.formBuilder.group({
      libelle: ['',[Validators.required, Validators.maxLength(255)]],
      description: ['',[Validators.maxLength(255)]],
      tache: ['',[Validators.required, Validators.maxLength(255)]],
      dateDebut: ['',[Validators.required]],
      dateFin: ['',[Validators.required]]      
    })
  }

  onSubmitFormL(){
    const formValue = this.lignesForm.value;
    
    const newLigne = new LignesProjetDto(
      formValue['libelle'],
      formValue['description'],
      formValue['tache'],
      formValue['dateDebut'],
      formValue['dateFin']      
    );    
    
    this.api.addLigne(newLigne).subscribe(data => {
      this.ligneresp.push(data);    
      this.lignes.push(data);  
    })

    // Réinitialisation du fomulaire après chaque submit
    // this.lignesForm.reset();
  }

  onSumbitMerge(){
    for (let i = 0; i < this.ligneresp.length; i++) {
      this.api.addLigneToProjet(this.spresp[0], this.ligneresp[i]).subscribe()
    }

    this._openSnackBar('Le nouveau projet  à bien été créé avec ses lignes','');
    setTimeout(() => {
      this.router.navigate(['accueil']);
    }, 2500);
  }

  onDeleteProjet(element){
    const index = this.spresp.indexOf(element);
    const idP = this.spresp[index].id;

    this.api.deleteProjet(idP).subscribe();

    // supprime le projet de l'array affiché
    this.spresp.splice(index,1);  
    
    // Affiche à nouveau le formulaire après la suppression du projet
    this.isDisplayed = false;
      
  }

  onDeleteLigne(element){
    const index = this.ligneresp.indexOf(element);
    
    const idL = this.ligneresp[index].id;

    this.api.deleteLigne(idL).subscribe();
    // supprime la ligne de l'array affiché
    this.ligneresp.splice(index,1)
  }

  errordate:any={isError:false,errorMessage:''};

  compareTwoDates(){
    if (new Date(this.lignesForm.controls['dateFin'].value)< new Date(this.lignesForm.controls['dateDebut'].value)) {
      this.errordate = {isError:true,errorMessage:'La date de fin ne peut commencer avant celle de début'};      
    }
 }

  getLigneFromServe(){
    this.api.getAllLigneFromServer().subscribe(data => {
      this.lignes = data;

      this.options = this.getTache(this.lignes);
      console.log(this.options);
    })
  }

  getTache(arrayLigne: LignesProjetDto[]){
    for (let index = 0; index < arrayLigne.length; index++) {
      const element = arrayLigne[index];
      
      const tache = element.tache;
      this.taches.push(tache);
    }

    const tache_filtered = this.taches.reduce((unique, item) => {
      /* étapes du fonctionnement du filtre --> https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
      // a. Item
      item,
      //b. Final Array (Accumulator)
      unique,
      //c. Condition (Remember it only get pushed if thid return 'false')
      unique.includes(item),
      //d. Reducer Function Result
      unique.includes(item) ? unique : [...unique, item],
      */
      return unique.includes(item) ? unique : [...unique, item]
    }, []);
    return tache_filtered;
  }
}
