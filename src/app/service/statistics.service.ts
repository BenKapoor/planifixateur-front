import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LignesProjetDto } from './../models/projet.model';
import { Projet } from '../models/projet.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl = 'https://planifixateur.herokuapp.com/statistics';
  // private baseUrl = 'http://localhost:8080/statistics';

  constructor(private httpClient: HttpClient) { }

  getTopTenProjet(): Observable<Projet[]>{
    return this.httpClient.get<Projet[]>(`${this.baseUrl}`+'/toptenprojets')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTopTenTache(): Observable<LignesProjetDto[]>{
    return this.httpClient.get<LignesProjetDto[]>(`${this.baseUrl}`+'/toptentaches')
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
