import * as moment from 'moment';

import { LignesProjetDto, Projet } from './../models/projet.model';

import { element } from 'protractor';

export default class Util {
 
    static  secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " jours ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " min ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " sec") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }
}

export function getTempsParProjet(element: Projet){
    var total = 0;
    var lignes = element?.lignesProjetDto;
    
    for (let i = 0; i < lignes?.length; i++) {
        const element = lignes[i];

        var a = moment(lignes[i].dateDebut !== null ? lignes[i].dateDebut : '0');
        var b = moment(lignes[i].dateFin !== null ? lignes[i].dateFin : '0');
        var c = b.diff(a,'seconds')
      
        // on additione les valeures de toutes les lignes
        total += c;      
    }
    return Util.secondsToDhms(total);
}

export function getTempsParLigne(element: LignesProjetDto){
    var a = moment(element.dateDebut !== null ? element.dateDebut : '0');
    var b = moment(element.dateFin !== null ? element.dateFin : '0');
    var c = b.diff(a,'seconds');
    return Util.secondsToDhms(c);
}