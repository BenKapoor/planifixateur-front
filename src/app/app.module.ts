import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccueilComponent } from './accueil/accueil.component';
import { AjoutLigneComponent } from './ajout-ligne/ajout-ligne.component';
import { AjoutProjetComponent } from './ajout-projet/ajout-projet.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { DetailProjetComponent } from './detail-projet/detail-projet.component';
import { HttpClientModule } from '@angular/common/http';
import { ListLigneComponent } from './list-ligne/list-ligne.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewLigneComponent } from './new-ligne/new-ligne.component';
import { NgModule } from '@angular/core';
import { UpdateProjetComponent } from './update-projet/update-projet.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AjoutProjetComponent,
    ListLigneComponent,
    NewLigneComponent,
    ConfirmationDialogComponent,
    UpdateProjetComponent,
    AjoutLigneComponent,
    DetailProjetComponent,
    ControlMessagesComponent,
    UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSnackBarModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
