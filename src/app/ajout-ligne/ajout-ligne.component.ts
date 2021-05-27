import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LignesProjetDto, Projet } from './../models/projet.model';

import { ApiService } from './../service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ajout-ligne',
  templateUrl: './ajout-ligne.component.html',
  styleUrls: ['./ajout-ligne.component.scss']
})
export class AjoutLigneComponent implements OnInit {

  // Array dans lequel on stock les taches des lignes non filtrées
  taches: Array<any> = []
  // autocomplete
  myControl = new FormControl();
  // Array dans lequel on stock les taches des lignes filtrées
  options?: Observable<string[]>;

  // Array stockant les lignes
  lignes: Array<LignesProjetDto> = [];
  // Array stockant toutes les nouvelles lignes crées
  ligneresp: LignesProjetDto[] = [];

  newLigne: LignesProjetDto;

  lignesForm: FormGroup; 
  lignesProjet: LignesProjetDto[];
  posLigneTab: number;
  projet: Projet;
  idProjet: number;

  isDisabled = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private router: Router) { }

  private _openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000
    });
  }

  ngOnInit(): void {
    this.idProjet = this.route.snapshot.params['id'];
    this._getProjet(this.idProjet);
    this._getLigneFromServe();
    this._initFormLigne();
  }

  private _getProjet(id: number){
    this.api.getProjetFromServer(id).subscribe(
      data => {
        this.projet = data;
        this.lignesProjet = data.lignesProjetDto;
      }
    )
  }

  private _initFormLigne(){
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
      formValue['dateFin'],
    );

    this.api.addLigne(newLigne).subscribe(data => {
      this.newLigne = data;
      this.ligneresp.push(data);
      this._refresh();
    })

    // Activation du bouton merge après la création de la prèmière ligne
    this.isDisabled = false;
  }

  onSumbitMerge(){
    for (let i = 0; i < this.ligneresp.length; i++) {
      this.api.addLigneToProjet(this.projet, this.ligneresp[i]).subscribe(data => {
      }) 
    }

    this._openSnackBar('L\'ajout des nouvelles lignes s\'est correctement effectué !','');
    setTimeout(() => {
      this.router.navigate(['accueil']);
    }, 2500);
  }

  errordate:any={isError:false,errorMessage:''};

  compareTwoDates(){
    if (new Date(this.lignesForm.controls['dateFin'].value)< new Date(this.lignesForm.controls['dateDebut'].value)) {
      this.errordate = {isError:true,errorMessage:'La date de fin ne peut commencer avant celle de début'};      
    }
  }

  private _getLigneFromServe(){
    this.api.getAllLigneFromServer().subscribe(data => {
      this.lignes = data;

      this.options = this.getTache(this.lignes);
    })
  }

  getTache(arrayLigne: LignesProjetDto[]){
    for (let index = 0; index < arrayLigne.length; index++) {
      const element = arrayLigne[index];
      
      const tache = element.tache;
      this.taches.push(tache);
    }

    const tache_filtered = this.taches.reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item]
    }, []);
    return tache_filtered;
  } 

  private _refresh(){
    this.lignesProjet.push(this.newLigne);
  }
}
