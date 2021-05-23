import { FilesDBDto, Projet } from './../models/projet.model';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  // private baseUrl = 'https://planifixateur.herokuapp.com';
  private baseUrl = 'http://localhost:8080/';
  
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any> | FilesDBDto> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any | FilesDBDto> {
    return this.http.get<FilesDBDto>(`${this.baseUrl}/files`);
  }
  
  addFileToProjet(projet: Projet, idFile: string): Observable<Projet>{
    const projetId = projet.id;

    return this.http.post<Projet>(`${this.baseUrl}`+'/projets/' + projetId + '/file/' +  idFile + '/add', projet)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteFile(id: string): Observable<FilesDBDto>{
    return this.http.delete<FilesDBDto>(`${this.baseUrl}`+'/file/' + id)
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
