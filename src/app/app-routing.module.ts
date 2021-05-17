import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { AjoutLigneComponent } from './ajout-ligne/ajout-ligne.component';
import { AjoutProjetComponent } from './ajout-projet/ajout-projet.component';
import { DetailProjetComponent } from './detail-projet/detail-projet.component';
import { ListLigneComponent } from './list-ligne/list-ligne.component';
import { NewLigneComponent } from './new-ligne/new-ligne.component';
import { NgModule } from '@angular/core';
import { UpdateProjetComponent } from './update-projet/update-projet.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';

const routes: Routes = [
  { path: 'upload', component: UploadFilesComponent},
  { path: 'projet/add-ligne/:id', component: AjoutLigneComponent},
  { path: 'projet/view/:id', component: DetailProjetComponent},
  { path: 'projet/update/:id', component: UpdateProjetComponent},
  { path: 'ajout', component: AjoutProjetComponent},
  { path: 'accueil', component: AccueilComponent},
  { path: '', component: AccueilComponent },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
