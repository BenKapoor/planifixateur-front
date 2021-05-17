import { ApiService } from './../service/api.service';
import { LignesProjetDto } from './../models/projet.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-ligne',
  templateUrl: './new-ligne.component.html',
  styleUrls: ['./new-ligne.component.scss']
})
export class NewLigneComponent implements OnInit {

  lignesForm: FormGroup;
  ligneresp: LignesProjetDto[] = [];
  postdata: LignesProjetDto;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.lignesForm = this.formBuilder.group({
      libelle: [],
      description: [],
      dateDebut: [],
      dateFin: []
    })
  }

  onSubmitForm(){
    const formValue = this.lignesForm.value;

    const newLigne = new LignesProjetDto(
      formValue['libelle'],
      formValue['description'],
      formValue['dateDebut'],
      formValue['dateFin'],
    );
    console.log(newLigne);

    this.api.addLigne(newLigne).subscribe(data => {
      console.log(data);

      this.ligneresp.push(data);
      console.log(this.ligneresp); 
    })
  }
}
