import * as moment from 'moment';

import { LignesProjetDto, Projet } from './../models/projet.model';

export default class Util {
 
}

// export function getTempsParProjet(element: Projet) {
//     var total = 0;
//     var lignes = element?.lignesProjetDto;
    
//     for (let i = 0; i < lignes?.length; i++) {
//         var d_debut = moment(lignes[i].dateDebut !== null ? lignes[i].dateDebut : '0');
//         var d_fin = moment(lignes[i].dateFin !== null ? lignes[i].dateFin : '0');
//         var diff = d_fin.diff(d_debut,'seconds')
      
//         total += diff;      
//     }
//     return Util.transfoSecEnJHMS(total);
// }

// export function getTempsParLigne(element: LignesProjetDto) {
//     var d_debut = moment(element.dateDebut !== null ? element.dateDebut : '0');
//     var d_fin = moment(element.dateFin !== null ? element.dateFin : '0');
//     var diff = d_fin.diff(d_debut,'seconds');
//     return Util.transfoSecEnJHMS(diff);
// }

export function transfoSecEnJHMS(seconds: number) {
    var j = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var jDisplay = j > 0 ? j + (j == 1 ? " jour " : " jours ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " heure " : " heures ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " seconde" : " secondes") : "";
    return jDisplay + hDisplay + mDisplay + sDisplay;
}