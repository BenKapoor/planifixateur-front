import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AccueilComponent } from './accueil/accueil.component';
import { AjoutLigneComponent } from './ajout-ligne/ajout-ligne.component';
import { AjoutProjetComponent } from './ajout-projet/ajout-projet.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { CustomDatePipe } from './utils/custom.datepipe';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewLigneComponent } from './new-ligne/new-ligne.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UpdateProjetComponent } from './update-projet/update-projet.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

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
    UploadFilesComponent,
    CustomDatePipe,
    DashboardComponent
    
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
    MatSnackBarModule,
    MatPaginatorModule,
    NgApexchartsModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
