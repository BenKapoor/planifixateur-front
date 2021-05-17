import { LignesProjetDto, Projet } from './../models/projet.model';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-ligne',
  templateUrl: './list-ligne.component.html',
  styleUrls: ['./list-ligne.component.scss']
})
export class ListLigneComponent implements OnInit {

  projet: Projet;

  lignesSubscription: Subscription;

  constructor(private api: ApiService, private route: ActivatedRoute) { }



  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    
    this.lignesSubscription = this.api.getProjetFromServer(id).subscribe(
      data => {
        this.projet = data;
      }
    )
  }

}
