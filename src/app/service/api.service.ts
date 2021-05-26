import { LignesProjetDto, Projet, TacheDto } from './../models/projet.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private baseUrl = 'https://planifixateur.herokuapp.com';
  private baseUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getAllProjetFromServer(): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.baseUrl}`+'/projets')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getProjetFromServer(id: number): Observable<Projet>{
    return this.httpClient.get<Projet>(`${this.baseUrl}`+'/projets/' + id)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );   
  }

  getLigneFromServer(id: number): Observable<LignesProjetDto[]>{
    return this.httpClient.get<LignesProjetDto[]>(`${this.baseUrl}`+'/lignesprojet/' + id)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );   
  }

  addProjet(projet: Projet): Observable<Projet>{
    return this.httpClient.post<Projet>(`${this.baseUrl}`+'/projets', projet)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  addLigne(projet: Projet): Observable<LignesProjetDto>{
    return this.httpClient.post<LignesProjetDto>(`${this.baseUrl}`+'/lignesprojet', projet)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllLigneFromServer(): Observable<LignesProjetDto[]>{
    return this.httpClient.get<LignesProjetDto[]>(`${this.baseUrl}`+'/lignesprojet/')
        .pipe(
          retry(1),
          catchError(this.handleError)
        );   
  }

  addLigneToProjet(projet: Projet, lignes: LignesProjetDto): Observable<Projet>{
    const projetId = projet.id;
    const ligneId = lignes.id;
    console.log(projetId + ' ' + ligneId);

    return this.httpClient.post<Projet>(`${this.baseUrl}`+'/projets/' + projetId + '/lignesprojet/' +  ligneId + '/add', projet)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteLigne(id: number): Observable<LignesProjetDto>{
    return this.httpClient.delete<LignesProjetDto>(`${this.baseUrl}`+'/lignesprojet/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteLigneFromProjet(projetId: number, ligneId: number): Observable<Projet>{
    return this.httpClient.delete<LignesProjetDto>(`${this.baseUrl}`+'/projets/' + projetId + '/lignesprojet/' +  ligneId + '/remove')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteProjet(id: number): Observable<Projet>{
    return this.httpClient.delete<Projet>(`${this.baseUrl}`+'/projets/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  putProjet(id: number, projet: Projet){
    
    return this.httpClient.put<Projet>(`${this.baseUrl}`+'/projets/' + id, projet)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  putLigne(id: number, ligne: LignesProjetDto){
    
    return this.httpClient.put<LignesProjetDto>(`${this.baseUrl}`+'/lignesprojet/' + id, ligne)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllTacheFromServer(): Observable<TacheDto[]>{
    return this.httpClient.get<TacheDto[]>(`${this.baseUrl}`+'/tache')
        .pipe(
          retry(1),
          catchError(this.handleError)
        );   
  }

  addTache(tache: TacheDto): Observable<TacheDto>{
    return this.httpClient.post<TacheDto>(`${this.baseUrl}`+'/tache', tache)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
