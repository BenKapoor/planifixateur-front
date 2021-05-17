import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LignesProjetDto, Projet } from './../models/projet.model';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../service/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styleUrls: ['./update-projet.component.scss']
})
export class UpdateProjetComponent implements OnInit {

  // Array dans lequel on stock les taches des lignes non filtrées
  taches: Array<any> = []

  // autocomplete
  myControl = new FormControl();
  // Array dans lequel on stock les taches des lignes filtrées
  options?: Observable<string[]>;

  // Array stockant les lignes
  lignes: Array<LignesProjetDto> = [];
  
  ispfDisplayed = false;
  islfDisplayed = true;
  projet: Projet;
  
  lignesProjet: LignesProjetDto[];
  projetForm: FormGroup;

  lignesForm: FormGroup;  
  posLigneTab: number;

  constructor(private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.getProjet(id);
    this.getLigneFromServe();
    

    this.initFormProjet();
    this.initFormLigne();
  }

  
  getProjet(id: number){
    this.api.getProjetFromServer(id).subscribe(
      data => {
        console.log(data);
        this.projet = data;
        this.lignesProjet = data.lignesProjetDto;
      }
    )
  }
  
  initFormProjet(){

    this.projetForm = this.formBuilder.group({
      // nom: ['',[Validators.required]],
      nom: new FormControl(this.projet?.nom, [Validators.required])
    })

    
  }

  updateProjet(){
    this.projetForm.patchValue({
      nom: this.projet?.nom
    });

    this.ispfDisplayed = true;
  }

  

  onSubmitFormP(){

    const formValue = this.projetForm.value;

    const updateProjet = new Projet(
      formValue['nom'],
    );

    const idP = this.projet.id;
    if ( ! idP) {
      console.log("Pas d'identifiant");
    }
    if (idP) {
      
      this.api.putProjet(idP, updateProjet).subscribe(data => {
        // Mise à jour set de données affiché
        this.projet = data;
      })
    }
  }

  initFormLigne(){
    this.lignesForm = this.formBuilder.group({
      libelle: ['',[Validators.required, Validators.maxLength(255)]],
      description: ['',[Validators.required, Validators.maxLength(255)]],
      tache: ['',[Validators.required, Validators.maxLength(255)]],
      dateDebut: ['',[Validators.required]],
      dateFin: ['',[Validators.required]]
    })
  }

  updateLigne(id: number){
    this.lignesForm.patchValue({
      libelle: this.lignesProjet[id].libelle,
      description: this.lignesProjet[id].description,
      dateDebut: moment(this.lignesProjet[id].dateDebut).format("YYYY-MM-DDTkk:mm"),
      dateFin: moment(this.lignesProjet[id].dateFin).format("YYYY-MM-DDTkk:mm")
    });   

    this.islfDisplayed = false;
    this.posLigneTab = id;
  }
  
  onSubmitFormL(){
    
    const idL = this.lignesProjet[this.posLigneTab].id;
    console.log(idL);
    const formValue = this.lignesForm.value;
    
    const updateLigne = new LignesProjetDto(
      formValue['libelle'],
      formValue['description'],
      formValue['tache'],
      formValue['dateDebut'],
      formValue['dateFin'],
    );

    if ( ! idL) {
      console.log("Pas d'identifiant");
    }
    if (idL) {
      this.api.putLigne(idL, updateLigne).subscribe(data => {
        // Mise à jour set de données affiché
        this.lignesProjet[this.posLigneTab] = data;
      })
      this.islfDisplayed = true;
    }    
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
      return unique.includes(item) ? unique : [...unique, item]
    }, []);
    return tache_filtered;
 } 

}
